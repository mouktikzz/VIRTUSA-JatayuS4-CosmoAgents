-- Create unreviewed_files table for tracking files that need user review
CREATE TABLE IF NOT EXISTS public.unreviewed_files (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  converted_code TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'unreviewed' CHECK (status IN ('unreviewed', 'reviewed')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.unreviewed_files ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'unreviewed_files' AND policyname = 'Users can view their own unreviewed files') THEN
        CREATE POLICY "Users can view their own unreviewed files" 
        ON public.unreviewed_files 
        FOR SELECT 
        USING (auth.uid() = user_id);
    END IF;
END $$;

DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'unreviewed_files' AND policyname = 'Users can create their own unreviewed files') THEN
        CREATE POLICY "Users can create their own unreviewed files" 
        ON public.unreviewed_files 
        FOR INSERT 
        WITH CHECK (auth.uid() = user_id);
    END IF;
END $$;

DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'unreviewed_files' AND policyname = 'Users can update their own unreviewed files') THEN
        CREATE POLICY "Users can update their own unreviewed files" 
        ON public.unreviewed_files 
        FOR UPDATE 
        USING (auth.uid() = user_id);
    END IF;
END $$;

DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'unreviewed_files' AND policyname = 'Users can delete their own unreviewed files') THEN
        CREATE POLICY "Users can delete their own unreviewed files" 
        ON public.unreviewed_files 
        FOR DELETE 
        USING (auth.uid() = user_id);
    END IF;
END $$;

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_unreviewed_files_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_unreviewed_files_updated_at') THEN
        CREATE TRIGGER update_unreviewed_files_updated_at
          BEFORE UPDATE ON public.unreviewed_files
          FOR EACH ROW
          EXECUTE FUNCTION public.update_unreviewed_files_updated_at();
    END IF;
END $$;