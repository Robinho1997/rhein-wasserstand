import FetchWasserstände from "./components/fetchWasserstände";

function App() {
  return (
    <div>
      <h1 className="text-white bg-tertiary text-center absolute top-0 w-full  p-2">
        Wasserstände Rhein Umkreis Siebengebirge
      </h1>
      <FetchWasserstände />
    </div>
  );
}
export default App;
