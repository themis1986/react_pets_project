import { useParams } from "react-router-dom";
import { Component } from "react";
import Carousel from "./Carousel";

// const Details = () => {
//   const { id } = useParams();

//   return <h2>{id}</h2>;
// };

class Details extends Component {
  //   constructor(props) {
  //     super(props);
  //     this.state = { loading: true };
  //   }
  state = { loading: true };

  async componentDidMount() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?id=${this.props.params.id}`
    );
    const json = await res.json();
    this.setState({ ...json.pets[0], loading: false });
    console.log(this.state);
  }

  render() {
    if (this.state.loading) {
      return <h2>Loading...</h2>;
    }
    const { animal, breed, city, state, description, name, images } =
      this.state;
    return (
      <div className="details">
        <Carousel images={images} />
        <div>
          <h1>{name}</h1>
          <h2>
            {animal} ~ {breed} ~ {city}, {state}
          </h2>
          <button>Adopt {name}</button>
          <p>{description}</p>
        </div>
      </div>
    );
  }
}

const WrappedDetails = () => {
  const params = useParams();

  return <Details params={params} />;
};

export default WrappedDetails;
