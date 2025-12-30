import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Play, 
  CheckCircle, 
  Lock, 
  LogOut, 
  User,
  Clock,
  BookOpen,
  Trophy
} from 'lucide-react';
import { toast } from 'sonner';

interface Lesson {
  id: string;
  title: string;
  description: string | null;
  duration_minutes: number | null;
  order_number: number;
  video_url: string | null;
}

interface UserProgress {
  lesson_id: string;
  completed: boolean;
  progress_percent: number;
}

interface Profile {
  full_name: string;
  email: string;
  phone: string;
}

export default function Dashboard() {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [userProgress, setUserProgress] = useState<UserProgress[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      // Fetch profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .maybeSingle();
      
      if (profileData) {
        setProfile(profileData);
      }

      // Fetch lessons
      const { data: lessonsData } = await supabase
        .from('lessons')
        .select('*')
        .order('order_number', { ascending: true });
      
      if (lessonsData) {
        setLessons(lessonsData);
      }

      // Fetch user progress
      const { data: progressData } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user?.id);
      
      if (progressData) {
        setUserProgress(progressData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    toast.success('با موفقیت خارج شدید');
    navigate('/');
  };

  const getProgress = (lessonId: string) => {
    return userProgress.find(p => p.lesson_id === lessonId);
  };

  const isLessonUnlocked = (index: number) => {
    if (index === 0) return true;
    const previousLesson = lessons[index - 1];
    const previousProgress = getProgress(previousLesson.id);
    return previousProgress?.completed || false;
  };

  const completedLessons = userProgress.filter(p => p.completed).length;
  const totalProgress = lessons.length > 0 
    ? Math.round((completedLessons / lessons.length) * 100) 
    : 0;

  if (loading || isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-vazir" dir="rtl">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              <span className="font-medium">{profile?.full_name || 'کاربر'}</span>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={handleSignOut}>
            <LogOut className="h-4 w-4 ml-2" />
            خروج
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">
            سلام {profile?.full_name?.split(' ')[0] || 'دوست عزیز'} 👋
          </h1>
          <p className="text-muted-foreground">
            به دوره خوش آمدید. پیشرفت خود را ادامه دهید.
          </p>
        </motion.div>

        {/* Progress Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-effect rounded-2xl p-6 mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold">پیشرفت کلی</h2>
            </div>
            <span className="text-2xl font-bold text-primary">{totalProgress}%</span>
          </div>
          <Progress value={totalProgress} className="h-3" />
          <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span>{completedLessons} از {lessons.length} جلسه تکمیل شده</span>
            </div>
          </div>
        </motion.div>

        {/* Lessons List */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold mb-4">جلسات دوره</h2>
          
          {lessons.length === 0 ? (
            <div className="glass-effect rounded-2xl p-8 text-center">
              <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">
                هنوز جلسه‌ای اضافه نشده است. به زودی محتوا بارگذاری می‌شود.
              </p>
            </div>
          ) : (
            lessons.map((lesson, index) => {
              const progress = getProgress(lesson.id);
              const unlocked = isLessonUnlocked(index);
              
              return (
                <motion.div
                  key={lesson.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {unlocked ? (
                    <Link to={`/lesson/${lesson.id}`}>
                      <div className={`glass-effect rounded-xl p-4 flex items-center gap-4 transition-all hover:bg-secondary/50 cursor-pointer ${
                        progress?.completed ? 'border-primary/30' : ''
                      }`}>
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          progress?.completed 
                            ? 'bg-primary/20 text-primary' 
                            : 'bg-secondary text-foreground'
                        }`}>
                          {progress?.completed ? (
                            <CheckCircle className="h-6 w-6" />
                          ) : (
                            <Play className="h-6 w-6" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">
                            جلسه {index + 1}: {lesson.title}
                          </h3>
                          {lesson.description && (
                            <p className="text-sm text-muted-foreground line-clamp-1">
                              {lesson.description}
                            </p>
                          )}
                          <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                            {lesson.duration_minutes && (
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {lesson.duration_minutes} دقیقه
                              </span>
                            )}
                            {progress && !progress.completed && progress.progress_percent > 0 && (
                              <span>{progress.progress_percent}% مشاهده شده</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ) : (
                    <div className="glass-effect rounded-xl p-4 flex items-center gap-4 opacity-50 cursor-not-allowed">
                      <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                        <Lock className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">
                          جلسه {index + 1}: {lesson.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          برای دسترسی به این جلسه، ابتدا جلسه قبل را تکمیل کنید
                        </p>
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })
          )}
        </div>
      </main>
    </div>
  );
}
