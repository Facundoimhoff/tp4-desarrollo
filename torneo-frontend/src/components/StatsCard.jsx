import Card from "react-bootstrap/Card";

function StatsCard({ titulo, valor }) {
  return (
    <Card className="shadow text-center">
      <Card.Body>
        <Card.Title>{titulo}</Card.Title>

        <h1>{valor}</h1>
      </Card.Body>
    </Card>
  );
}

export default StatsCard;