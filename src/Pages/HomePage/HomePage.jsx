import "./homepage.css";

const HomePage = () => {
  return (
    <div className="something">
      <h1>Photo Gallery</h1>
      <ul>
        <li>
          <a href={`/login`}>Login</a>
        </li>
      </ul>
    </div>
  );
};

export default HomePage;
