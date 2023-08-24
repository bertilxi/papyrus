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

  return { id: user?.id, handle: meQuery.data?.result.handle ?? "" };
}
