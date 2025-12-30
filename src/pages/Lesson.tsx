import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle, 
  Download, 
  FileText,
  Play,
  Home
} from 'lucide-react';
import { toast } from 'sonner';

interface Lesson {
  id: string;
  title: string;
  description: string | null;
  video_url: string | null;
  duration_minutes: number | null;
  order_number: number;
}

interface LessonFile {
  id: string;
  file_name: string;
  file_url: string;
  file_type: string | null;
}

interface Quiz {
  id: string;
  title: string;
  questions: QuizQuestion[];
}

interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
}

interface UserProgress {
  id: string;
  completed: boolean;
  progress_percent: number;
}

export default function Lesson() {
  const { id } = useParams<{ id: string }>();
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [files, setFiles] = useState<LessonFile[]>([]);
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [showQuizResults, setShowQuizResults] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user && id) {
      fetchLesson();
    }
  }, [user, id]);

  const fetchLesson = async () => {
    setIsLoading(true);
    try {
      // Fetch current lesson
      const { data: lessonData } = await supabase
        .from('lessons')
        .select('*')
        .eq('id', id)
        .maybeSingle();
      
      if (lessonData) {
        setLesson(lessonData);
      }

      // Fetch all lessons for navigation
      const { data: lessonsData } = await supabase
        .from('lessons')
        .select('*')
        .order('order_number', { ascending: true });
      
      if (lessonsData) {
        setLessons(lessonsData);
      }

      // Fetch lesson files
      const { data: filesData } = await supabase
        .from('lesson_files')
        .select('*')
        .eq('lesson_id', id);
      
      if (filesData) {
        setFiles(filesData);
      }

      // Fetch quiz
      const { data: quizData } = await supabase
        .from('quizzes')
        .select('*')
        .eq('lesson_id', id)
        .maybeSingle();
      
      if (quizData) {
        const rawQuestions = quizData.questions;
        const questions: QuizQuestion[] = Array.isArray(rawQuestions) 
          ? (rawQuestions as unknown as QuizQuestion[])
          : [];
        setQuiz({ ...quizData, questions });
        setQuizAnswers(new Array(questions.length).fill(-1));
      }

      // Fetch user progress
      const { data: progressData } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user?.id)
        .eq('lesson_id', id)
        .maybeSingle();
      
      if (progressData) {
        setUserProgress(progressData);
      }
    } catch (error) {
      console.error('Error fetching lesson:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const markAsCompleted = async () => {
    if (!user || !id) return;

    try {
      if (userProgress) {
        await supabase
          .from('user_progress')
          .update({ completed: true, completed_at: new Date().toISOString(), progress_percent: 100 })
          .eq('id', userProgress.id);
      } else {
        await supabase
          .from('user_progress')
          .insert({
            user_id: user.id,
            lesson_id: id,
            completed: true,
            completed_at: new Date().toISOString(),
            progress_percent: 100
          });
      }
      
      setUserProgress(prev => prev 
        ? { ...prev, completed: true, progress_percent: 100 }
        : { id: '', completed: true, progress_percent: 100 }
      );
      
      toast.success('جلسه با موفقیت تکمیل شد!');
    } catch (error) {
      console.error('Error marking lesson as completed:', error);
      toast.error('خطا در ثبت پیشرفت');
    }
  };

  const handleQuizSubmit = async () => {
    if (!quiz || !user) return;

    let correct = 0;
    quiz.questions.forEach((q, i) => {
      if (quizAnswers[i] === q.correct) {
        correct++;
      }
    });

    const score = Math.round((correct / quiz.questions.length) * 100);
    setQuizScore(score);
    setShowQuizResults(true);

    // Save quiz result
    try {
      await supabase
        .from('quiz_results')
        .upsert({
          user_id: user.id,
          quiz_id: quiz.id,
          score,
          total_questions: quiz.questions.length,
          answers: quizAnswers
        }, { onConflict: 'user_id,quiz_id' });
    } catch (error) {
      console.error('Error saving quiz result:', error);
    }

    if (score >= 70) {
      await markAsCompleted();
    }
  };

  const currentIndex = lessons.findIndex(l => l.id === id);
  const prevLesson = currentIndex > 0 ? lessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null;

  if (loading || isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center font-vazir" dir="rtl">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">جلسه یافت نشد</h1>
          <Button onClick={() => navigate('/dashboard')}>
            بازگشت به داشبورد
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-vazir" dir="rtl">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/dashboard">
              <Button variant="ghost" size="sm">
                <Home className="h-4 w-4 ml-2" />
                داشبورد
              </Button>
            </Link>
          </div>
          <h1 className="text-lg font-medium truncate max-w-md">
            جلسه {currentIndex + 1}: {lesson.title}
          </h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Video Player */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-effect rounded-2xl overflow-hidden mb-8"
        >
          {lesson.video_url ? (
            <div className="aspect-video bg-black">
              <video
                src={lesson.video_url}
                controls
                className="w-full h-full"
                poster=""
              />
            </div>
          ) : (
            <div className="aspect-video bg-secondary flex items-center justify-center">
              <div className="text-center">
                <Play className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">ویدیو هنوز آپلود نشده است</p>
              </div>
            </div>
          )}
        </motion.div>

        {/* Lesson Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-effect rounded-2xl p-6 mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">{lesson.title}</h2>
            {userProgress?.completed && (
              <span className="flex items-center gap-2 text-primary">
                <CheckCircle className="h-5 w-5" />
                تکمیل شده
              </span>
            )}
          </div>
          {lesson.description && (
            <p className="text-muted-foreground">{lesson.description}</p>
          )}
        </motion.div>

        {/* Downloadable Files */}
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-effect rounded-2xl p-6 mb-8"
          >
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FileText className="h-5 w-5" />
              فایل‌های تمرینی
            </h3>
            <div className="space-y-2">
              {files.map(file => (
                <a
                  key={file.id}
                  href={file.file_url}
                  download
                  className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                >
                  <span>{file.file_name}</span>
                  <Download className="h-4 w-4" />
                </a>
              ))}
            </div>
          </motion.div>
        )}

        {/* Quiz */}
        {quiz && quiz.questions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-effect rounded-2xl p-6 mb-8"
          >
            <h3 className="text-lg font-semibold mb-4">{quiz.title}</h3>
            
            {showQuizResults ? (
              <div className="text-center py-8">
                <div className={`text-6xl font-bold mb-4 ${quizScore >= 70 ? 'text-primary' : 'text-destructive'}`}>
                  {quizScore}%
                </div>
                <p className="text-muted-foreground mb-4">
                  {quizScore >= 70 
                    ? 'آفرین! شما این جلسه را با موفقیت گذراندید.' 
                    : 'متأسفانه نمره کافی نیست. دوباره تلاش کنید.'}
                </p>
                {quizScore < 70 && (
                  <Button onClick={() => {
                    setShowQuizResults(false);
                    setQuizAnswers(new Array(quiz.questions.length).fill(-1));
                  }}>
                    تلاش مجدد
                  </Button>
                )}
              </div>
            ) : (
              <div className="space-y-6">
                {quiz.questions.map((q, qIndex) => (
                  <div key={qIndex} className="space-y-3">
                    <p className="font-medium">
                      {qIndex + 1}. {q.question}
                    </p>
                    <div className="space-y-2">
                      {q.options.map((option, oIndex) => (
                        <label
                          key={oIndex}
                          className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                            quizAnswers[qIndex] === oIndex 
                              ? 'bg-primary/20 border border-primary/30' 
                              : 'bg-secondary/50 hover:bg-secondary'
                          }`}
                        >
                          <input
                            type="radio"
                            name={`question-${qIndex}`}
                            checked={quizAnswers[qIndex] === oIndex}
                            onChange={() => {
                              const newAnswers = [...quizAnswers];
                              newAnswers[qIndex] = oIndex;
                              setQuizAnswers(newAnswers);
                            }}
                            className="w-4 h-4"
                          />
                          <span>{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
                <Button 
                  onClick={handleQuizSubmit}
                  disabled={quizAnswers.includes(-1)}
                  className="w-full"
                >
                  ثبت پاسخ‌ها
                </Button>
              </div>
            )}
          </motion.div>
        )}

        {/* Mark as Complete (if no quiz) */}
        {(!quiz || quiz.questions.length === 0) && !userProgress?.completed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <Button onClick={markAsCompleted} className="w-full">
              <CheckCircle className="h-4 w-4 ml-2" />
              علامت‌زدن به عنوان تکمیل شده
            </Button>
          </motion.div>
        )}

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-between"
        >
          {prevLesson ? (
            <Link to={`/lesson/${prevLesson.id}`}>
              <Button variant="outline">
                <ArrowRight className="h-4 w-4 ml-2" />
                جلسه قبل
              </Button>
            </Link>
          ) : (
            <div />
          )}
          
          {nextLesson && userProgress?.completed ? (
            <Link to={`/lesson/${nextLesson.id}`}>
              <Button>
                جلسه بعد
                <ArrowLeft className="h-4 w-4 mr-2" />
              </Button>
            </Link>
          ) : nextLesson ? (
            <Button disabled>
              جلسه بعد
              <ArrowLeft className="h-4 w-4 mr-2" />
            </Button>
          ) : (
            <div />
          )}
        </motion.div>
      </main>
    </div>
  );
}
