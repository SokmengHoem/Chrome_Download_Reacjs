interface Child2Props {
  sharedData: string;
}

function Child2({ sharedData }: Child2Props) {
  return (
    <>
      <div className=" ml-4">
        <h1 className=" text-4xl font-bold mt-4 mb-4">Child Component2</h1>
        <div>{sharedData}</div>
      </div>
    </>
  );
}
export default Child2;
