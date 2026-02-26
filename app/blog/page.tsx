export default async function Page() {
  await new Promise(resolve => setTimeout(resolve, 2000));
  return <div>blog</div>;
}
