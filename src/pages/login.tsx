import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, Link } from "react-router-dom";
import { Activity, Mail, Lock } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError(null);
    setLoading(true);
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      navigate("/");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      <div className="w-full max-w-md px-6">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
            <Activity className="w-7 h-7 text-primary-foreground" />
          </div>
          <span className="text-3xl font-bold text-foreground">HealthAI</span>
        </div>

        {/* Login Card */}
        <div className="bg-card p-8 rounded-2xl shadow-xl border border-border">
          <h2 className="text-2xl font-bold mb-2 text-foreground">Welcome back</h2>
          <p className="text-muted-foreground mb-6">Sign in to your account to continue</p>
          
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
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>
            </div>

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full gradient-primary text-primary-foreground py-3 px-4 rounded-xl font-semibold shadow-lg hover:shadow-glow-active transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </div>

          <p className="text-center mt-6 text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary hover:text-primary/80 font-semibold transition-colors">
              Sign up
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

export default Login;
