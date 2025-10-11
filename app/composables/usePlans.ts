export async function usePlans() {
  const { data, error } = await useFetch('/api/webUnlimitedPlan');
  return { plans: data.value || [], error };
}
