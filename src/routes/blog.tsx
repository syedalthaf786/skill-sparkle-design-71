import { useEffect, useState } from "react";
import { Calendar, User, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  image?: string;
  tags: string[];
  published: boolean;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const { error: checkError } = await supabase.from("blog_posts").select("id").limit(1);
        if (checkError && !checkError.message.includes("could not find the table")) {
          console.warn("Could not load blog posts:", checkError);
          const saved = localStorage.getItem("blogPosts");
          if (saved) {
            const parsed = JSON.parse(saved);
            setPosts(Array.isArray(parsed) ? parsed.filter((p: BlogPost) => p.published) : []);
          }
          setLoading(false);
          return;
        }
        if (!checkError) {
          const { data } = await supabase
            .from("blog_posts")
            .select("*")
            .eq("published", true)
            .order("date", { ascending: false });
          if (data) {
            setPosts(data);
          }
        }
      } catch (err) {
        console.warn("Could not load blog posts:", err);
        const saved = localStorage.getItem("blogPosts");
        if (saved) {
          const parsed = JSON.parse(saved);
          setPosts(Array.isArray(parsed) ? parsed.filter((p: BlogPost) => p.published) : []);
        }
      } finally {
        setLoading(false);
      }
    };
    loadPosts();
  }, []);

  return (
    <div>
      <section className="border-b border-border bg-surface py-12">
        <div className="container-x">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-primary hover:underline mb-4">
            <ArrowLeft size={16} /> Back to Home
          </Link>
          <h1 className="text-4xl font-bold md:text-5xl">Blog & Updates</h1>
          <p className="mt-2 text-muted-foreground">Stay updated with our latest insights and news</p>
        </div>
      </section>

      <section className="container-x py-12">
        {loading ? (
          <div className="text-center py-12">Loading posts...</div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p>No blog posts published yet.</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article key={post.id} className="card-surface overflow-hidden">
                {post.image && (
                  <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
                )}
                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {new Date(post.date).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <User size={14} />
                      {post.author}
                    </span>
                  </div>
                  <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {post.content}
                  </p>
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span key={tag} className="text-xs px-2 py-1 rounded bg-muted">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}