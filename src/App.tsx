
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Page imports
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import FileUpload from "./pages/FileUpload";
import FileUploadStatus from "./pages/FileUploadStatus";
import ManageData from "./pages/ManageData";
import RoleLevelOptimization from "./pages/RoleLevelOptimization";
import UserLevelOptimization from "./pages/UserLevelOptimization";
import ResultsPage from "./pages/ResultsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/upload" element={<FileUpload />} />
          <Route path="/status" element={<FileUploadStatus />} />
          <Route path="/manage" element={<ManageData />} />
          <Route path="/role-optimization" element={<RoleLevelOptimization />} />
          <Route path="/user-optimization" element={<UserLevelOptimization />} />
          <Route path="/results/:type/:id" element={<ResultsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
