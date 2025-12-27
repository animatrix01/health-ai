import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, Link } from "react-router-dom";
import { Activity, Mail, Lock, User } from "lucide-react";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async () => {
    setError(null);
    setLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      setLoading(false);

      if (error) {
        // Check if it's an email configuration error
        if (error.message.includes("email") || error.message.includes("SMTP") || error.message.includes("mail")) {
          setError("Email service not configured. Please configure SMTP in Supabase dashboard (Settings → Auth → SMTP Settings) or use a test account.");
        } else {
          setError(error.message);
        }
      } else if (data.user) {
        // Check if user is auto-confirmed or has a session
        if (data.session) {
          // User has a session, they're logged in - profile will be empty for new users
          navigate("/");
        } else {
          // User created but no session - email confirmation required
          setError("Account created but email confirmation is required. Please configure SMTP in your Supabase project or enable auto-confirm.");
        }
      }
    } catch (err: any) {
      setLoading(false);
      setError(err.message || "An error occurred during signup");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSignup();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-background via-secondary/5 to-primary/5">
      <div className="w-full max-w-md px-6">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-xl gradient-secondary flex items-center justify-center shadow-glow">
            <Activity className="w-7 h-7 text-primary-foreground" />
          </div>
          <span className="text-3xl font-bold text-foreground">HealthAI</span>
        </div>

        {/* Signup Card */}
        <div className="bg-card p-8 rounded-2xl shadow-xl border border-border">
          <h2 className="text-2xl font-bold mb-2 text-foreground">Create account</h2>
          <p className="text-muted-foreground mb-6">Start your health journey today</p>
          
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">Must be at least 6 characters</p>
            </div>

            <button
              onClick={handleSignup}
              disabled={loading}
              className="w-full gradient-secondary text-primary-foreground py-3 px-4 rounded-xl font-semibold shadow-lg hover:shadow-glow-active transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </div>

          <p className="text-center mt-6 text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-secondary hover:text-secondary/80 font-semibold transition-colors">
              Sign in
            </Link>
          </p>
        </div>

        <p className="text-center mt-6 text-xs text-muted-foreground">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default Signup;
