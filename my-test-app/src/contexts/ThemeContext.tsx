// ThemeContext.tsx
import React, { createContext, useContext, useState } from 'react';

type Theme = 'light' | 'dark';
type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface Props {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<Props> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light');

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};



// import { Dispatch, FC, SetStateAction, createContext, useState } from "react";

// interface ThemeContextType {
//   themeValue: "light" | "dark";
//   setThemValue: Dispatch<SetStateAction<"light" | "dark">>;
// }

// export const ThemeContext = createContext<ThemeContextType>({
//   themeValue: "light",
//   setThemValue: () => {},
// });

// interface Props {
//   children: React.ReactNode;
//   initial?: "light" | "dark";
// }

// export const ThemeContextProvider: FC<Props> = ({
//   children,
//   initial = "light",
// }) => {
//   const [themeValue, setThemValue] = useState(initial);

//   return (
//     <ThemeContext.Provider value={{ themeValue, setThemValue }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };
