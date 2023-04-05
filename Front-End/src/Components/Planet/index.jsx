import SVG from "./SVG";

export default function Planet(props) {
  return (
    <>
      <SVG id={props.motion} width="500px" height="500px" />
    </>
  );
}
