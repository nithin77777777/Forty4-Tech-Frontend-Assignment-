import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 30, // 30 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <head>
        <title>User Dashboard - React Assignment</title>
        <meta
          name="description"
          content="A React-based User Dashboard application built for managing users with search and CRUD functionality."
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Set theme before page renders to prevent flash
              if (typeof window !== 'undefined') {
                if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              }
            `,
          }}
        />
      </head>
      <body className="h-full bg-[#F8FAFC] dark:bg-[#0A0A0A] transition-colors duration-200">
        <QueryClientProvider client={queryClient}>
          <div className="h-full">
            {/* Consolidated Google Fonts Import for User Dashboard */}
            <style jsx global>{`
              @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600&family=Sora:wght@400;600;700&family=Open+Sans:wght@400;600&family=JetBrains+Mono:wght@700&family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600;12..96,700&family=Montserrat:wght@300;400;500;600;700&family=Poppins:wght@600&display=swap');
              
              .font-inter { font-family: 'Inter', sans-serif; }
              .font-plus-jakarta { font-family: 'Plus Jakarta Sans', sans-serif; }
              .font-sora { font-family: 'Sora', sans-serif; }
              .font-opensans { font-family: 'Open Sans', sans-serif; }
              .font-jetbrains { font-family: 'JetBrains Mono', monospace; }
              .font-bricolage { font-family: 'Bricolage Grotesque', sans-serif; }
              .font-montserrat { font-family: 'Montserrat', sans-serif; }
              .font-poppins { font-family: 'Poppins', sans-serif; }

              /* Custom scrollbar styling */
              ::-webkit-scrollbar {
                width: 8px;
              }
              
              ::-webkit-scrollbar-track {
                background: #f1f5f9;
              }
              
              .dark ::-webkit-scrollbar-track {
                background: #1e293b;
              }
              
              ::-webkit-scrollbar-thumb {
                background: #cbd5e1;
                border-radius: 4px;
              }
              
              .dark ::-webkit-scrollbar-thumb {
                background: #475569;
              }
              
              ::-webkit-scrollbar-thumb:hover {
                background: #94a3b8;
              }
              
              .dark ::-webkit-scrollbar-thumb:hover {
                background: #64748b;
              }

              /* Smooth focus transitions for better accessibility */
              *:focus {
                outline: none;
              }

              *:focus-visible {
                outline: 2px solid #4f46e5;
                outline-offset: 2px;
              }
            `}</style>
            {children}
          </div>
        </QueryClientProvider>
      </body>
    </html>
  );
}
