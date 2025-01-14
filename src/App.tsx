import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';
import LandingPage from "./pages/landing/LandingPage";
import CategoryPage from "./pages/category/CategoryPage";
import LoginPage from './pages/login/LoginPage';
import RegisterPage from './pages/register/RegisterPage';
import InstructionPage from './pages/instruction/InstructionPage';
import QuizPage from './pages/quiz/QuizPage';
import ScorePage from './pages/score/ScorePage';
import NotFound from './pages/notfound/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/category' element={<CategoryPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/instruction/:quizId' element={<ProtectedRoute><InstructionPage /></ProtectedRoute>} />
        <Route path='/quiz/:quizId' element={<ProtectedRoute><QuizPage /></ProtectedRoute>} />
        <Route path='/score/:quizId' element={<ProtectedRoute><ScorePage /></ProtectedRoute>} />
        {/* Catch all route for undefined paths */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
