
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Wand2Icon, RefreshCwIcon, LightbulbIcon, ClipboardCopy } from 'lucide-react';

const FieldWithControls = ({ label, value, setValue }: { label: string; value: string; setValue: (val: string) => void }) => (
  <div className="space-y-1 relative">
    <Label className="text-sm font-medium text-gray-700">{label}</Label>
    <Textarea
      placeholder={`Enter ${label.toLowerCase()}...`}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="pr-24 resize-none"
    />
    <div className="absolute right-2 top-8 flex gap-2 items-center">
      {value ? (
        <Button size="icon" variant="ghost" onClick={() => setValue('')}>
          <RefreshCwIcon className="w-4 h-4" />
        </Button>
      ) : (
        <LightbulbIcon className="w-6 h-6 cursor-pointer text-yellow-400" />
      )}
      {value && (
        <Button 
          size="sm"
          variant="secondary"
          className="flex items-center gap-1 px-2 py-1"
          onClick={() => alert(`Enhancing ${label}...`)}
        >
          <Wand2Icon className="w-4 h-4" /> Enhance
        </Button>
      )}
    </div>
  </div>
);

interface ContentGeneratorProps {
  selectedAdType: string;
}

export const ContentGenerator: React.FC<ContentGeneratorProps> = ({ selectedAdType }) => {
  // Handle the selected ad type
  console.log('Selected Ad Type:', selectedAdType);
  const [loading, setLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [songSuggestions, setSongSuggestions] = useState('');
  const [notes, setNotes] = useState('');

  const { toast } = useToast();
  const { user } = useAuth();

  const generateProposal = async () => {
    setLoading(true);
    setTimeout(() => {
      const proposal = `Generated preview for title: ${title}\n\nDescription: ${description}\n\nHashtags: ${hashtags}`;
      setGeneratedContent(proposal);
      setLoading(false);
      toast({ title: 'Content Generated!', description: 'Your preview is ready.' });
    }, 1500);
  };

  return (
    <div className="space-y-6 px-4 py-6 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-xl">Content Generator</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="Content" className="w-full">
              <TabsList className="w-full grid grid-cols-1 mb-4">
                <TabsTrigger value="Content">Content</TabsTrigger>
              </TabsList>
              <TabsContent value="Content" className="space-y-5">
                <FieldWithControls label="Title" value={title} setValue={setTitle} />
                <FieldWithControls label="Description" value={description} setValue={setDescription} />
                <FieldWithControls label="Hashtags" value={hashtags} setValue={setHashtags} />

                <div className="space-y-1">
                  <Label>Posts</Label>
                  <Textarea rows={4} placeholder="Your post content..." className="resize-none" />
                </div>

                <div className="space-y-1">
                  <Label>File / Image Upload</Label>
                  <Input type="file" />
                </div>

                <div className="space-y-1">
                  <Label>Additional Notes</Label>
                  <Textarea rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Anything extra?" className="resize-none" />
                </div>

                <div className="space-y-1">
                  <Label>Song Suggestions</Label>
                  <Textarea rows={2} value={songSuggestions} onChange={(e) => setSongSuggestions(e.target.value)} placeholder="Suggest songs..." className="resize-none" />
                </div>

                <Button 
                  onClick={generateProposal} 
                  className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white"
                  disabled={loading}
                >
                  {loading ? 'Generating...' : 'Generate Preview'}
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl">Generated Content</CardTitle>
              {generatedContent && (
                <Button variant="outline" size="sm" onClick={() => navigator.clipboard.writeText(generatedContent)}>
                  <ClipboardCopy className="w-4 h-4" />
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-3">
                <div className="animate-pulse bg-gray-200 h-4 rounded w-full" />
                <div className="animate-pulse bg-gray-200 h-4 rounded w-3/4" />
                <div className="animate-pulse bg-gray-200 h-4 rounded w-1/2" />
              </div>
            ) : generatedContent ? (
              <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans">
                {generatedContent}
              </pre>
            ) : (
              <div className="text-center text-gray-500 py-12">
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">✨</span>
                </div>
                <p>Select content fields and generate your preview.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
