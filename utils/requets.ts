const NEXT_PUBLIC_API_DOMAIN = process.env.NEXT_PUBLIC_API_DOMAIN || null;
export const fetchAdverts = (p: any) => {
  return {
    queryKey: [
      `${p?.color ? p?.color : "All"}`,
      `${p?.brand ? p?.brand : "All"}`,
      `${p?.type ? p?.type : "All"}`,
      `${p?.transmission ? p.transmission : "All"}`,
      `${p?.searchText ? p.searchText : ""}`,
      `${p?.yearMin ? p.yearMin : 1920}`,
      `${p?.yearMax ? p.yearMax : new Date().getFullYear()}`,
      `${p?.category ? p.category : "All"}`,
      `${p?.milageMin ? p.milageMin : 0}`,
      `${p?.milageMax ? p.milageMax : 1000000}`,
      `${p?.sort ? p.sort : "ascending"}`,
      `${p?.page ? p.page : 1}`,
    ],
    queryFn: async () => {
      const queryString = new URLSearchParams(p).toString();
      const response = await fetch(
        `${NEXT_PUBLIC_API_DOMAIN}/search?${queryString}`
      );
      const tj = await response.json();
      return tj;
    },
  };
};
export const fetchSingleAdvert = (id: string) => {
  return {
    queryKey: [`cars`, `${id}`],
    queryFn: async () => {
      const response = await fetch(`${NEXT_PUBLIC_API_DOMAIN}/cars/${id}`);
      const tj = await response.json();
      return tj;
    },
  };
};
