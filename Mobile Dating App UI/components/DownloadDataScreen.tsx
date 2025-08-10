import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { 
  ArrowLeft, 
  Download, 
  FileText, 
  Check, 
  Clock,
  Shield,
  Info
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface DownloadDataScreenProps {
  onBack: () => void;
}

interface DataRequest {
  id: string;
  status: 'requested' | 'processing' | 'ready' | 'downloaded';
  requestDate: string;
  readyDate?: string;
  downloadUrl?: string;
}

export default function DownloadDataScreen({ onBack }: DownloadDataScreenProps) {
  const [isRequesting, setIsRequesting] = useState(false);
  const [hasRequested, setHasRequested] = useState(false);
  const [requestDate, setRequestDate] = useState<string>('');

  // Mock previous requests (in a real app, this would come from an API)
  const [previousRequests] = useState<DataRequest[]>([
    {
      id: '1',
      status: 'ready',
      requestDate: 'March 15, 2024',
      readyDate: 'March 17, 2024',
      downloadUrl: '#'
    },
    {
      id: '2',
      status: 'downloaded',
      requestDate: 'February 28, 2024',
      readyDate: 'March 2, 2024',
      downloadUrl: '#'
    }
  ]);

  const handleRequestData = async () => {
    setIsRequesting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const now = new Date();
      const formattedDate = now.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
      
      setHasRequested(true);
      setRequestDate(formattedDate);
      
      toast.success('Data request submitted successfully!');
    } catch (error) {
      toast.error('Failed to submit data request. Please try again.');
    } finally {
      setIsRequesting(false);
    }
  };

  const getStatusBadge = (status: DataRequest['status']) => {
    switch (status) {
      case 'requested':
        return (
          <Badge variant="secondary" className="rounded-full bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
            <Clock className="w-3 h-3 mr-1" />
            Requested
          </Badge>
        );
      case 'processing':
        return (
          <Badge variant="secondary" className="rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
            <div className="w-3 h-3 mr-1 border border-blue-500 border-t-transparent rounded-full animate-spin" />
            Processing
          </Badge>
        );
      case 'ready':
        return (
          <Badge variant="secondary" className="rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
            <Check className="w-3 h-3 mr-1" />
            Ready
          </Badge>
        );
      case 'downloaded':
        return (
          <Badge variant="secondary" className="rounded-full bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400">
            <Download className="w-3 h-3 mr-1" />
            Downloaded
          </Badge>
        );
    }
  };

  const dataTypes = [
    'Profile information and photos',
    'Match history and preferences',
    'Chat messages and conversations',
    'Swipe history and activity',
    'Account settings and preferences',
    'Location and usage data'
  ];

  return (
    <div className="h-full bg-gradient-to-b from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
      {/* Header */}
      <div className="px-6 pt-16 pb-6">
        <div className="flex items-center gap-3 mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="p-2 -ml-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="w-10 h-10 rounded-2xl gradient-primary flex items-center justify-center">
            <Download className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl gradient-text">Download My Data</h1>
        </div>
        
        <p className="text-muted-foreground">
          Request a copy of your account data, including profile info, matches, and messages.
        </p>
      </div>

      <div className="px-6 pb-6 space-y-6">
        {/* Current Request Status */}
        {hasRequested ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Card className="rounded-2xl gradient-primary text-white">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                    <Check className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium mb-1">Request Submitted</h3>
                    <p className="text-white/80 text-sm">
                      Requested on {requestDate}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge variant="secondary" className="rounded-full bg-white/20 text-white border-0">
                      Processing
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          /* Data Request Card */
          <Card className="rounded-2xl">
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mx-auto">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Request Your Data</h3>
                  <p className="text-muted-foreground text-sm">
                    Get a complete copy of all your account data in a downloadable file
                  </p>
                </div>

                <Button
                  onClick={handleRequestData}
                  disabled={isRequesting}
                  className="w-full h-12 rounded-2xl gradient-primary text-white"
                >
                  <Download className="w-5 h-5 mr-2" />
                  {isRequesting ? 'Submitting Request...' : 'Request Data'}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* What's Included */}
        <Card className="rounded-2xl">
          <CardContent className="p-4">
            <h3 className="font-medium mb-3 flex items-center gap-2">
              <FileText className="w-5 h-5 text-purple-500" />
              What's Included
            </h3>
            <div className="space-y-2">
              {dataTypes.map((item, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Timeline Info */}
        <Card className="rounded-2xl border-blue-200 bg-blue-50/50 dark:bg-blue-950/20 dark:border-blue-800">
          <CardContent className="p-4">
            <div className="flex gap-3">
              <Clock className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-700 dark:text-blue-300 mb-1">
                  Processing Time
                </h4>
                <p className="text-sm text-blue-600 dark:text-blue-400">
                  Your data will be ready for download within 48 hours. We'll send you an email notification when it's ready.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Previous Requests */}
        {previousRequests.length > 0 && (
          <div>
            <h3 className="font-medium mb-3 px-1">Previous Requests</h3>
            <div className="space-y-3">
              {previousRequests.map((request) => (
                <Card key={request.id} className="rounded-2xl">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium">Data Export</span>
                          {getStatusBadge(request.status)}
                        </div>
                        <div className="text-xs text-muted-foreground space-y-1">
                          <p>Requested: {request.requestDate}</p>
                          {request.readyDate && (
                            <p>Ready: {request.readyDate}</p>
                          )}
                        </div>
                      </div>
                      
                      {request.status === 'ready' && (
                        <Button
                          size="sm"
                          className="rounded-full gradient-primary text-white"
                          onClick={() => toast.success('Download started!')}
                        >
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </Button>
                      )}
                      
                      {request.status === 'downloaded' && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="rounded-full"
                          disabled
                        >
                          <Check className="w-4 h-4 mr-1" />
                          Downloaded
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Privacy Notice */}
        <Card className="rounded-2xl border-amber-200 bg-amber-50/50 dark:bg-amber-950/20 dark:border-amber-800">
          <CardContent className="p-4">
            <div className="flex gap-3">
              <Shield className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-amber-700 dark:text-amber-300 mb-1">
                  Privacy & Security
                </h4>
                <p className="text-sm text-amber-600 dark:text-amber-400">
                  Your data export will be securely encrypted and available for download for 7 days. After that, it will be automatically deleted from our servers.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}