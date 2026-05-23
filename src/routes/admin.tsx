import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Save, RefreshCw, Upload, X, Inbox } from "lucide-react";

const defaultAdUrl = "/ad-banner.jpg";

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  date: string;
}

export default function Admin() {
  const [adUrl, setAdUrl] = useState(defaultAdUrl);
  const [saved, setSaved] = useState(false);
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const savedUrl = localStorage.getItem("popupAdUrl");
    if (savedUrl) {
      setAdUrl(savedUrl);
    }

    const savedSubmissions = localStorage.getItem("contactSubmissions");
    if (savedSubmissions) {
      setSubmissions(JSON.parse(savedSubmissions));
    }
  }, []);

  useEffect(() => {
    const savedSubmissions = localStorage.getItem("contactSubmissions");
    if (savedSubmissions) {
      setSubmissions(JSON.parse(savedSubmissions));
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      setAdUrl(base64);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    localStorage.setItem("popupAdUrl", adUrl);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    setAdUrl(defaultAdUrl);
    localStorage.setItem("popupAdUrl", defaultAdUrl);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const clearSubmissions = () => {
    localStorage.setItem("contactSubmissions", "[]");
    setSubmissions([]);
  };

  const previewImage = adUrl || defaultAdUrl;

  return (
    <>
      <header className="border-b border-border bg-surface">
        <div className="container-x flex items-center justify-between py-4">
          <Link to="/" className="text-lg font-bold">
            Svms Technologies
          </Link>
          <Link to="/" className="text-sm text-primary hover:underline">
            Back to Home
          </Link>
        </div>
      </header>
      <div className="container-x py-12">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-3xl font-bold mb-6">Popup Ad Admin</h1>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Upload Ad Image</label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary file:text-primary-foreground hover:file:opacity-90"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Click to upload an image file (JPG, PNG, GIF, etc.)
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Or Enter Image URL</label>
              <input
                type="text"
                value={adUrl.startsWith("data:") ? "" : adUrl}
                onChange={(e) => setAdUrl(e.target.value)}
                placeholder="Enter image URL (e.g., /my-ad.jpg or https://example.com/ad.jpg)"
                className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Enter a path like <code>/my-ad.jpg</code> (place image in public folder) or full URL
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-primary-foreground hover:opacity-90 transition"
              >
                <Save size={16} /> Save
              </button>
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 hover:bg-muted transition"
              >
                <RefreshCw size={16} /> Reset to Default
              </button>
            </div>

            {saved && (
              <div className="rounded-lg bg-green-500/10 px-4 py-2 text-sm text-green-600">
                Settings saved! Refresh the home page to see the changes.
              </div>
            )}

            <div className="border-t border-border pt-4">
              <h2 className="text-sm font-medium mb-2">Preview</h2>
              <div className="relative max-w-sm">
                <div className="relative rounded-lg shadow-2xl overflow-hidden">
                  <img
                    src={previewImage}
                    alt="Ad preview"
                    className="w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "https://placehold.co/400x250/png?text=Ad+Preview";
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-border pt-4">
              <h2 className="text-sm font-medium mb-2">How to Add Your Own Ad</h2>
              <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                <li>Upload an image using the file picker above, or enter an image URL</li>
                <li>Click Save to store the image in your browser</li>
                <li>Refresh the home page to see the popup</li>
                <li>The popup shows once per session to each visitor</li>
              </ol>
            </div>

            <div className="border-t border-border pt-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Contact Form Submissions</h2>
                {submissions.length > 0 && (
                  <button
                    onClick={clearSubmissions}
                    className="text-sm text-red-500 hover:underline"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {submissions.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Inbox size={48} className="mx-auto mb-2 opacity-30" />
                  <p>No submissions yet</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {submissions.map((sub) => (
                    <div key={sub.id} className="rounded-lg border border-border bg-card p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold">{sub.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(sub.date).toLocaleString()}
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground mb-2">
                        <span className="font-medium text-foreground">Email:</span> {sub.email}
                      </div>
                      <div className="text-sm text-muted-foreground mb-2">
                        <span className="font-medium text-foreground">Phone:</span> {sub.phone}
                      </div>
                      <div className="text-sm text-muted-foreground mb-2">
                        <span className="font-medium text-foreground">Service:</span> {sub.service}
                      </div>
                      <div className="text-sm">
                        <span className="font-medium text-foreground">Message:</span>
                        <p className="mt-1">{sub.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
