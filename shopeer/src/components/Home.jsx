import Brick from "./bricks/Bricks";

const Home = ({guestMode}) => {
    const brickNames = ['User', 'Category', 'Product', 'Review', 'Shop order', 'Order item'];
    return (
      <div className="container">
        <div className="bricks" style={{display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "100px"}}>
          {brickNames.map((brickName, index) => (
            <Brick
              key={index}
              name={brickName}
              guestMode={guestMode}
            />
          ))}
        </div>
      </div>
    );
  };
  
export default Home