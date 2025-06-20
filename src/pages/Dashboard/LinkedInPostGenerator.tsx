import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { LinkedInPostService } from '@/services/linkedinPostService';
import { Loader2 } from 'lucide-react';

const LinkedInPostGenerator = () => {
  const [accountType, setAccountType] = useState<'personal' | 'company'>('personal');
  const [userName, setUserName] = useState('');
  const [industry, setIndustry] = useState('');
  const [roleOrBrand, setRoleOrBrand] = useState('');
  const [postTopic, setPostTopic] = useState('');
  const [tone, setTone] = useState<'inspirational' | 'bold' | 'humble' | 'confident' | 'professional'>('professional');
  const [audience, setAudience] = useState('');
  const [imagePath, setImagePath] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedPost, setGeneratedPost] = useState(null);

  const handleGeneratePost = async () => {
    setLoading(true);
    try {
      const service = new LinkedInPostService();
      const post = await service.generateLinkedInPost({
        account_type: accountType,
        user_name: userName,
        industry: industry,
        role_or_brand: roleOrBrand,
        post_topic: postTopic,
        tone: tone,
        audience: audience,
        image_path: imagePath
      });
      setGeneratedPost(post);
    } catch (error) {
      console.error('Error generating post:', error);
      alert('Failed to generate LinkedIn post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">LinkedIn Post Generator</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Account Type</label>
          <Select
            value={accountType}
            onValueChange={(value: 'personal' | 'company') => setAccountType(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select account type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="personal">Personal</SelectItem>
              <SelectItem value="company">Company</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Name/Brand</label>
          <Input
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter your name or company name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Industry</label>
          <Input
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            placeholder="Enter your industry"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Role/Brand</label>
          <Input
            value={roleOrBrand}
            onChange={(e) => setRoleOrBrand(e.target.value)}
            placeholder="Enter your profession or company name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Post Topic</label>
          <Input
            value={postTopic}
            onChange={(e) => setPostTopic(e.target.value)}
            placeholder="Enter post topic"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Tone</label>
          <Select
            value={tone}
            onValueChange={(value: 'inspirational' | 'bold' | 'humble' | 'confident' | 'professional') => setTone(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select tone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="inspirational">Inspirational</SelectItem>
              <SelectItem value="bold">Bold</SelectItem>
              <SelectItem value="humble">Humble</SelectItem>
              <SelectItem value="confident">Confident</SelectItem>
              <SelectItem value="professional">Professional</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Audience</label>
          <Input
            value={audience}
            onChange={(e) => setAudience(e.target.value)}
            placeholder="Enter target audience"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Image Path</label>
          <Input
            value={imagePath}
            onChange={(e) => setImagePath(e.target.value)}
            placeholder="Enter image path"
          />
        </div>
      </div>

      <Button
        onClick={handleGeneratePost}
        disabled={loading}
        className="w-full md:w-auto"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating...
          </>
        ) : (
          'Generate LinkedIn Post'
        )}
      </Button>

      {generatedPost && (
        <div className="mt-8 p-6 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Generated LinkedIn Post</h2>
          <div className="mb-4">
            <h3 className="font-medium mb-2">Post Text:</h3>
            <Textarea
              value={generatedPost.post_text}
              readOnly
              className="min-h-[100px]"
            />
          </div>
          <div className="mb-4">
            <h3 className="font-medium mb-2">Image Caption:</h3>
            <p className="bg-gray-100 p-2 rounded">{generatedPost.image_caption}</p>
          </div>
          <div className="mb-4">
            <h3 className="font-medium mb-2">Image URL:</h3>
            <a
              href={generatedPost.image_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800"
            >
              {generatedPost.image_url}
            </a>
          </div>
          <div>
            <h3 className="font-medium mb-2">Metadata:</h3>
            <pre className="bg-gray-100 p-4 rounded whitespace-pre-wrap">
              {JSON.stringify(generatedPost.post_metadata, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default LinkedInPostGenerator;
