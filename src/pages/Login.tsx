import { useState } from "react";
import { useLocation } from "wouter";
import { auth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { Loader2, Lock, ShieldCheck } from "lucide-react";
import logoFullEn from "@/assets/branding/meteory-logo-full-en.png";
import logoFullAr from "@/assets/branding/meteory-logo-full-ar.png";

export default function Login() {
  const [, setLocation] = useLocation();
  const { language } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await auth.login(password);

    setLoading(false);
    if (result.success) {
      setLocation("/admin");
    } else {
      setError(language === "en" ? String(result.error || "Invalid password") : "بيانات الدخول غير صحيحة");
    }
  };

  const logo = language === "ar" ? logoFullAr : logoFullEn;

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md shadow-2xl border-t-4 border-t-primary">
        <CardHeader className="text-center pb-2">
          <div className="flex justify-center mb-6">
            <img src={logo} alt="Meteory" width={240} height={64} className="h-12 w-auto object-contain" />
          </div>
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
            <Lock className="w-6 h-6" />
          </div>
          <CardTitle className="text-2xl font-bold uppercase tracking-wide">
            {language === "en" ? "Admin Access" : "دخول المشرف"}
          </CardTitle>
          <CardDescription>
            {language === "en" ? "Secure Login Required" : "مطلوب تسجيل الدخول الآمن"}
          </CardDescription>
        </CardHeader>
        
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4 pt-4">
            {error && (
              <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="password">{language === "en" ? "Admin Password" : "كلمة مرور المشرف"}</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-11"
              />
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col gap-4">
            <Button 
              type="submit" 
              className="w-full h-11 text-base uppercase font-bold tracking-widest" 
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {language === "en" ? "Verifying..." : "جاري التحقق..."}
                </>
              ) : (
                language === "en" ? "Secure Login" : "تسجيل الدخول"
              )}
            </Button>
            
            <Button 
              type="button" 
              variant="link" 
              className="text-xs text-muted-foreground"
              onClick={() => setLocation("/")}
            >
              {language === "en" ? "Back to Website" : "العودة للموقع"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
