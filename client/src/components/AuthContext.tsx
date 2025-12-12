import { createContext, useState, useContext } from "react";
import type { ReactNode } from "react";

// ----- USER TYPES -----

export type ClientUser = {
  ma_khach_hang: string;
  ten: string;
  sdt: string;
  gioi_tinh: string;
  email: string;
};

export type EmployeeUser = {
  ma_nv: string;
  ten: string;
  cccd: string;
  sdt: string;
  ngay_sinh: string;
  gioi_tinh: string;
  luong: number;
  chuc_vu: string;
  dia_chi: string;
  ma_nv_quan_ly: string | null;
  ma_rap_phim: string | null;
};

export type User =
  | { type: "client"; data: ClientUser }
  | { type: "employee"; data: EmployeeUser }
  | null;

// ----- CONTEXT TYPE -----

export type AuthContextType = {
  user: User;
  setUser: (u: User) => void;
  logout: () => void;
};

// ----- CONTEXT -----

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

// ----- PROVIDER -----

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null);

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}