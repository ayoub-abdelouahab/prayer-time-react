import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
export const Prayer = ({name, time , image}) => {
  return (
    <>
      <Card className="prayer-card" sx={{ maxWidth: 345 , minWidth: 200 ,  }}>
        <CardMedia
          sx={{ height: 160 }}
          image={image}
          // title=""
        />
        <CardContent>
          <h2 style={{textAlign:"center",  }}  variant="h5" >
            {name}
          </h2>
          <Typography style={{textAlign:"center"}}  variant="h3"  sx={{ color: "text.secondary" , fontWeight:"200" }}>
            {time}
          </Typography>
        </CardContent>

      </Card>

      {/* <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          sx={{ height: 140 }}
          image="../public/assets/images.jpg"
          title="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Lizard
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card> */}
    </>
  );
};
