import { Box, Card, CardContent, Grid, Typography, Link } from "@mui/material";
import React from "react";
import Snippet from "../../components/Snippet/Snippet";
import { Link as RouterLink } from "react-router-dom";

const Snippets = (): React.ReactElement => {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Card elevation={0} variant="outlined">
            <CardContent>
              <Typography variant="h5" fontWeight={"bold"}>
                HHLAB
              </Typography>

              <Box sx={{ mt: 1 }}>
                <Link component={RouterLink} to="/u/hhlab">
                  394 Snippets
                </Link>
              </Box>
              <Box>
                <Link component={RouterLink} to="/u/hhlab/likes">
                  43 Liked Snippets
                </Link>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={9}>
          <Snippet />
        </Grid>
      </Grid>
    </>
  );
};

export default Snippets;
