import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Save, RefreshCw, Upload, X, Inbox, Plus, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { supabase } from "@/lib/supabase";

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

interface CareersSubmission {
  id: string;
  role: string;
  name: string;
  email: string;
  phone: string;
  resume: string;
  message: string;
  date: string;
}

interface AdItem {
  id: string;
  url: string;
}

export default function Admin() {
  const [ads, setAds] = useState<AdItem[]>([{ id: "1", url: defaultAdUrl }]);
  const [saved, setSaved] = useState(false);
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [careersSubmissions, setCareersSubmissions] = useState<CareersSubmission[]>([]);
  const fileInputRefs = useRef<Record<string, HTMLInputElement>>({});

  useEffect(() => {
    const loadAds = async () => {
      // Load directly from Supabase (admin needs fresh data)
      try {
        const { data, error } = await supabase
          .from("popup_ads")
          .select("id, url")
          .eq("active", true)
          .order("created_at", { ascending: true });
        if (!error && data && data.length > 0) {
          setAds(data);
          localStorage.setItem("popupAds", JSON.stringify(data));
        } else if (error) {
          // Fallback to localStorage if Supabase fails
          const savedAds = localStorage.getItem("popupAds");
          if (savedAds) {
            const parsed = JSON.parse(savedAds);
            if (Array.isArray(parsed) && parsed.length > 0) {
              setAds(parsed);
            }
          }
        }
      } catch (err) {
        console.warn("Could not load ads from Supabase:", err);
        const savedAds = localStorage.getItem("popupAds");
        if (savedAds) {
          const parsed = JSON.parse(savedAds);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setAds(parsed);
          }
        }
      }
    };
    loadAds();

    // Load contact submissions from Supabase
    const loadContactSubmissions = async () => {
      try {
        const { data } = await supabase
          .from("contact_submissions")
          .select("*")
          .order("created_at", { ascending: false });
        if (data) {
          setSubmissions(data);
          localStorage.setItem("contactSubmissions", JSON.stringify(data));
        }
      } catch (err) {
        console.warn("Could not load contact submissions:", err);
        const savedSubmissions = localStorage.getItem("contactSubmissions");
        if (savedSubmissions) {
          setSubmissions(JSON.parse(savedSubmissions));
        }
      }
    };
    loadContactSubmissions();

    // Load careers submissions from Supabase
    const loadCareersSubmissions = async () => {
      try {
        const { data } = await supabase
          .from("careers_submissions")
          .select("*")
          .order("created_at", { ascending: false });
        if (data) {
          setCareersSubmissions(data);
          localStorage.setItem("careersSubmissions", JSON.stringify(data));
        }
      } catch (err) {
        console.warn("Could not load careers submissions:", err);
        const savedCareersSubmissions = localStorage.getItem("careersSubmissions");
        if (savedCareersSubmissions) {
          setCareersSubmissions(JSON.parse(savedCareersSubmissions));
        }
      }
    };
    loadCareersSubmissions();
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Try Supabase Storage first, fallback to base64
    try {
      const fileName = `popup-ads/${id}-${Date.now()}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("popup-ads")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage.from("popup-ads").getPublicUrl(fileName);
      if (urlData?.publicUrl) {
        updateAdUrl(id, urlData.publicUrl);
        return;
      }
    } catch (storageErr: any) {
      console.warn("Storage upload failed, using base64 fallback:", storageErr.message);
    }

    // Fallback: Use base64 encoding
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      updateAdUrl(id, base64);
    };
    reader.readAsDataURL(file);
  };

  const addAd = () => {
    setAds([...ads, { id: Date.now().toString(), url: "" }]);
  };

  const removeAd = (id: string) => {
    if (ads.length <= 1) {
      alert("At least one ad is required");
      return;
    }
    setAds(ads.filter((ad) => ad.id !== id));
  };

  const updateAdUrl = (id: string, url: string) => {
    const newAds = ads.map((ad) => (ad.id === id ? { ...ad, url } : ad));
    setAds(newAds);
  };

  const handleSave = async () => {
    try {
      console.log("Saving ads to popup_ads table:", ads);
      
      // First check if we can read (table exists)
      const { data: testData, error: testError } = await supabase.from("popup_ads").select("*").limit(1);
      if (testError) {
        console.error("Table read error:", testError);
        alert("Database table error: " + testError.message + "\n\nEnsure table 'popup_ads' exists with columns: id, url, active");
        return;
      }
      
      // Delete existing records
      const { error: deleteError } = await supabase.from("popup_ads").delete().neq("id", "");
      if (deleteError) {
        console.warn("Delete warning:", deleteError);
      }
      
      // Insert new records
      const rows = ads.map((ad) => ({ 
        id: ad.id, 
        url: ad.url, 
        active: ad.active !== undefined ? ad.active : true 
      }));
      
      if (rows.length > 0) {
        const { error: insertError } = await supabase.from("popup_ads").insert(rows);
        if (insertError) {
          console.error("Insert error:", insertError);
          throw insertError;
        }
      }
      
      // Always save localStorage
      localStorage.setItem("popupAds", JSON.stringify(ads));
      localStorage.removeItem("popupAdsTime");
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err: any) {
      console.error("Save failed:", err);
      localStorage.setItem("popupAds", JSON.stringify(ads));
      alert("Error saving to database: " + (err.message || "Unknown error") + ". Saved locally.");
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  const handleReset = async () => {
    try {
      const defaultAds = [{ id: "1", url: defaultAdUrl }];
      setAds(defaultAds);
      await supabase.from("popup_ads").delete().neq("id", "");
      await supabase.from("popup_ads").insert(defaultAds);
      localStorage.setItem("popupAds", JSON.stringify(defaultAds));
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err: any) {
      alert("Failed to reset: " + (err.message || "Unknown error"));
    }
  };

  const clearSubmissions = async () => {
    if (confirm("Delete all contact submissions?")) {
      await supabase.from("contact_submissions").delete().neq("id", "");
      localStorage.setItem("contactSubmissions", "[]");
      setSubmissions([]);
    }
  };

  const clearCareersSubmissions = async () => {
    if (confirm("Delete all careers submissions?")) {
      await supabase.from("careers_submissions").delete().neq("id", "");
      localStorage.setItem("careersSubmissions", "[]");
      setCareersSubmissions([]);
    }
  };

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
          <h1 className="text-3xl font-bold mb-6">Popup Ad Admin (Carousel)</h1>

          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium">Ad Images</label>
                <button
                  onClick={addAd}
                  className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                >
                  <Plus size={14} /> Add Ad
                </button>
              </div>

              <div className="space-y-4">
                {ads.map((ad, index) => (
                  <div key={ad.id} className="rounded-lg border border-border bg-card p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Ad #{index + 1}</span>
                      {ads.length > 1 && (
                        <button
                          onClick={() => removeAd(ad.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>

                    <div className="space-y-2">
                      <input
                        ref={(el) => {
                          if (el) fileInputRefs.current[ad.id] = el;
                        }}
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, ad.id)}
                        className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
                      />
                      <input
                        type="text"
                        value={ad.url}
                        onChange={(e) => updateAdUrl(ad.id, e.target.value)}
                        placeholder="Or enter image URL"
                        className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
                      />
</div>

                    {ad.url && (
                      <div className="mt-3 rounded-lg overflow-hidden">
                        <img
                          src={ad.url}
                          alt={`Ad ${index + 1} preview`}
                          className="w-full max-h-40 object-cover"
                          onError={(e) => {
                            e.currentTarget.src = "https://placehold.co/400x200/png?text=Ad+Preview";
                          }}
                        />
                      </div>
                    )}
                    {!ad.url && (
                      <div className="mt-3 rounded-lg overflow-hidden bg-muted flex items-center justify-center h-40">
                        <span className="text-sm text-muted-foreground">No image selected</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <p className="text-xs text-muted-foreground mt-2">
                Add multiple ads to create a carousel. Each ad will rotate automatically.
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
              <h2 className="text-sm font-medium mb-2">How It Works</h2>
              <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                <li>Upload images or enter URLs for each ad</li>
                <li>Click Save to store them in your browser</li>
                <li>Ads will rotate automatically in a carousel popup</li>
                <li>Popup shows once per session to each visitor</li>
              </ol>
            </div>

            <div className="border-t border-border pt-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Contact Form Submissions</h2>
                {submissions.length > 0 && (
                  <button onClick={clearSubmissions} className="text-sm text-red-500 hover:underline">
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

            <div className="border-t border-border pt-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Careers Applications</h2>
                {careersSubmissions.length > 0 && (
                  <button onClick={clearCareersSubmissions} className="text-sm text-red-500 hover:underline">
                    Clear All
                  </button>
                )}
              </div>

              {careersSubmissions.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Inbox size={48} className="mx-auto mb-2 opacity-30" />
                  <p>No applications yet</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {careersSubmissions.map((app) => (
                    <div key={app.id} className="rounded-lg border border-border bg-card p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold">{app.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(app.date).toLocaleString()}
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground mb-2">
                        <span className="font-medium text-foreground">Role:</span> {app.role}
                      </div>
                      <div className="text-sm text-muted-foreground mb-2">
                        <span className="font-medium text-foreground">Email:</span> {app.email}
                      </div>
                      <div className="text-sm text-muted-foreground mb-2">
                        <span className="font-medium text-foreground">Phone:</span> {app.phone}
                      </div>
                      <div className="text-sm text-muted-foreground mb-2">
                        <span className="font-medium text-foreground">Resume:</span>{" "}
                        <a href={app.resume} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                          Link
                        </a>
                      </div>
                      <div className="text-sm">
                        <span className="font-medium text-foreground">Message:</span>
                        <p className="mt-1">{app.message}</p>
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