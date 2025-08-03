import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  Folder, 
  FolderOpen, 
  FileText, 
  Database, 
  Zap, 
  GitBranch,
  Check,
  X,
  Play,
  ChevronDown,
  ChevronRight,
  RefreshCw,
  AlertTriangle,
  Loader2,
  Rows,
  Trash2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface FileItem {
  id: string;
  name: string;
  path: string;
  type: 'table' | 'procedure' | 'trigger' | 'other';
  content: string;
  conversionStatus: 'pending' | 'success' | 'failed';
  convertedContent?: string;
  errorMessage?: string;
}

interface FileTreeViewProps {
  files: FileItem[];
  onFileSelect: (file: FileItem) => void;
  onConvertFile?: (fileId: string) => void;
  onConvertAllByType?: (type: 'table' | 'procedure' | 'trigger' | 'other') => void;
  onConvertAll?: () => void;
  onFixFile?: (fileId: string) => void;
  selectedFile: FileItem | null;
  isConverting?: boolean;
  convertingFileIds?: string[];
  onClear?: () => void;
  hideActions?: boolean;
  defaultExpandedSections?: string[];
  searchTerm?: string;
  statusFilter?: string;
  onSearchTermChange?: (term: string) => void;
  onStatusFilterChange?: (status: string) => void;
  onResetMigration?: () => void;
  selectedFileIds?: string[];
  onFileSelectToggle?: (fileId: string) => void;
  isSelectMode?: boolean;
  toggleSelectMode?: () => void;
  onDeleteSelected?: () => void;
}

const FileTreeView: React.FC<FileTreeViewProps> = ({
  files,
  onFileSelect,
  onConvertFile,
  onConvertAllByType,
  onConvertAll,
  onFixFile,
  selectedFile,
  isConverting = false,
  convertingFileIds = [],
  onClear,
  hideActions = false,
  defaultExpandedSections = [],
  searchTerm = '',
  statusFilter = 'All',
  onSearchTermChange,
  onStatusFilterChange,
  onResetMigration,
  selectedFileIds = [],
  onFileSelectToggle,
  isSelectMode = false,
  toggleSelectMode,
  onDeleteSelected,
}) => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(() => {
    if (defaultExpandedSections && defaultExpandedSections.length > 0) {
      return new Set(defaultExpandedSections);
    }
    return new Set(['tables', 'procedures', 'triggers']);
  });

  // Filter files by search and status
  const filteredFiles = files.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === 'All' ? true :
      statusFilter === 'Pending' ? file.conversionStatus === 'pending' :
      statusFilter === 'Success' ? file.conversionStatus === 'success' :
      statusFilter === 'Failed' ? file.conversionStatus === 'failed' : true;
    return matchesSearch && matchesStatus;
  });

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  const getFilesByType = (type: string) => {
    return filteredFiles.filter(file => file.type === type);
  };

  const getSectionIcon = (type: string) => {
    switch (type) {
      case 'tables':
        return <Database className="h-4 w-4 text-blue-600" />;
      case 'procedures':
        return <Zap className="h-4 w-4 text-purple-600" />;
      case 'triggers':
        return <GitBranch className="h-4 w-4 text-orange-600" />;
      default:
        return <FileText className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusIcon = (status: 'pending' | 'success' | 'failed', fileId: string) => {
    if (isConverting && convertingFileIds.includes(fileId)) {
      return <Loader2 className="h-4 w-4 text-blue-600 animate-spin" />;
    }
    if (status === 'success') {
      return <Check className="h-4 w-4 text-green-600" />;
    }
    if (status === 'failed') {
      return <X className="h-4 w-4 text-red-600" />;
    }
    return null;
  };

  const renderSection = (sectionKey: string, sectionTitle: string, sectionFiles: FileItem[]) => {
    const isExpanded = expandedSections.has(sectionKey);
    const pendingCount = sectionFiles.filter(f => f.conversionStatus === 'pending').length;
    const typeKey = sectionKey === 'tables' ? 'table' : 
                   sectionKey === 'procedures' ? 'procedure' : 
                   sectionKey === 'triggers' ? 'trigger' : 'other';
    return (
      <div key={sectionKey} className="mb-2">
        <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded sticky top-0 z-10 bg-white dark:bg-slate-900" style={{ boxShadow: '0 1px 0 0 #e5e7eb' }}>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => toggleSection(sectionKey)}
            className="flex-1 justify-start p-0 h-auto font-medium"
          >
            {isExpanded ? 
              <ChevronDown className="h-4 w-4 mr-2" /> : 
              <ChevronRight className="h-4 w-4 mr-2" />
            }
            {getSectionIcon(sectionKey)}
            <span className="ml-2">{sectionTitle} ({sectionFiles.length})</span>
          </Button>
          {!hideActions && pendingCount > 0 && onConvertAllByType && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => onConvertAllByType(typeKey as 'table' | 'procedure' | 'trigger' | 'other')}
              className="text-xs px-2 py-1 h-6"
            >
              <RefreshCw className="h-3 w-3 mr-1" />
              Convert All ({pendingCount})
            </Button>
          )}
        </div>
        {isExpanded && (
          <div className="ml-4 space-y-1">
            {sectionFiles.map((file) => (
              <div
                key={file.id}
                className={cn(
                  "flex items-center justify-between p-2 rounded hover:bg-gray-50 cursor-pointer group",
                  selectedFile?.id === file.id && "bg-blue-50 border border-blue-200"
                )}
                onClick={() => onFileSelect(file)}
              >
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  {isSelectMode && (
                    <Checkbox
                        checked={selectedFileIds.includes(file.id)}
                        onCheckedChange={() => onFileSelectToggle?.(file.id)}
                        onClick={(e) => e.stopPropagation()}
                    />
                  )}
                  <FileText className="h-4 w-4 text-gray-500 flex-shrink-0" />
                  <span className={cn(
                    "text-sm truncate",
                    file.conversionStatus === 'success' && "text-green-700",
                    file.conversionStatus === 'failed' && "text-red-700"
                  )}>
                    {file.name}
                  </span>
                </div>
                {!hideActions && (
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {onConvertFile && getStatusIcon(file.conversionStatus, file.id)}
                    {file.conversionStatus === 'pending' && onConvertFile && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          onConvertFile(file.id);
                        }}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-xs px-2 py-1 h-6"
                      >
                        Convert
                      </Button>
                    )}
                    {file.conversionStatus === 'failed' && onFixFile && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          onFixFile(file.id);
                        }}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-xs px-2 py-1 h-6 text-red-600 border-red-200 hover:bg-red-50"
                      >
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        Fix
                      </Button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const tables = getFilesByType('table');
  const procedures = getFilesByType('procedure');
  const triggers = getFilesByType('trigger');
  const others = getFilesByType('other');
  const totalPending = files.filter(f => f.conversionStatus === 'pending').length;

  return (
    <div className="w-full">
        <div className="pb-3 flex flex-col gap-2">
          <div className="flex flex-row items-center justify-between w-full mb-2">
        <div className="flex items-center gap-2">
            {!hideActions && (
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={toggleSelectMode}
                            className={cn(
                                "h-7 w-7",
                                isSelectMode && "bg-blue-100"
                            )}
                        >
                            <Rows className="h-4 w-4" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{isSelectMode ? "Cancel Selection" : "Select Multiple Files"}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            )}
            {isSelectMode && selectedFileIds && selectedFileIds.length > 0 && !hideActions &&(
                <>
                    <span className="text-sm text-muted-foreground">{selectedFileIds.length} selected</span>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="destructive"
                                    size="icon"
                                    onClick={onDeleteSelected}
                                    className="h-7 w-7"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Delete ({selectedFileIds.length}) selected files</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </>
            )}
            </div>
          {!hideActions && (
            <div className="flex gap-2">
              {onConvertAll && totalPending > 0 && (
                <Button
                  onClick={onConvertAll}
                  className="text-xs px-3 py-1 h-7 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <RefreshCw className="h-4 w-4 mr-1" />
                  Convert All ({totalPending})
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
      <CardContent className="p-0">
        <div className="space-y-1 px-4 pb-4 overflow-y-auto" style={{ maxHeight: 320 }}>
          {renderSection('tables', 'Tables', tables)}
          {renderSection('procedures', 'Procedures', procedures)}
          {renderSection('triggers', 'Triggers', triggers)}
          {others.length > 0 && renderSection('other', 'Other Files', others)}
        </div>
      </CardContent>
    </div>
  );
};

export default FileTreeView;
