export async function webUnlimitedPlan() {
  const { data, error } = await useFetch('/api/webUnlimitedPlan');
  return { plans: data.value || [], error };
}
