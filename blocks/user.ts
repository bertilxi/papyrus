import { useUser as useClerkUser } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import { api } from "./api.ts";

export function useUser() {
  const { user } = useClerkUser();

  const meQuery = useQuery({
    queryKey: ["me"],
    queryFn: api.me,
    enabled: !!user?.id,
  });

  if (meQuery.isSuccess) {
    return {
      id: user?.id,
      handle: meQuery.data?.result?.handle ?? "",
      isLoaded: true,
    };
  }

  return { id: "", handle: "", isLoaded: false };
}
