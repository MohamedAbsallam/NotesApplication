import SVG from "./../Planet/SVG";

export default function Skeleton() {
  return (
    <>
      <center>
        <SVG
          motion="planet"
          width="200px"
          height="200px"
          style={{ animation: "spin 1s ease-in-out infinite" }}
        />
      </center>
    </>
  );
}
