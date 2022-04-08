import { FavoriteBorderOutlined } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Link,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import { blue, grey } from "@mui/material/colors";
import React, { useCallback } from "react";
import { Link as RouteLink } from "react-router-dom";

const UserFeed = () => {
  const [loading, setLoading] = React.useState(false);

  const handleLike = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [setLoading]);

  return (
    <>
      <Stack direction="row" alignItems={"center"} spacing={1}>
        <Avatar alt="hhlab" />
        <Box>
          <Link component={RouteLink} to="/u/hhlab" color={"initial"}>
            <Typography component="span" fontWeight={"bold"}>
              hhlab
            </Typography>
          </Link>

          <Typography component="span" sx={{ mx: "5px" }}>
            liked
          </Typography>

          <Link component={RouteLink} to="/s/hhlab/sample" color={"initial"}>
            <Typography component="span" fontWeight={"bold"}>
              hhlab/sample
            </Typography>
          </Link>

          <Typography
            component="span"
            sx={{ ml: "5px" }}
            fontWeight={"light"}
            variant="body2"
          >
            16 hours ago
          </Typography>
        </Box>
      </Stack>

      <Card variant="outlined" sx={{ mt: "5px", ml: 4, bgcolor: grey[50] }}>
        <CardContent>
          <Grid container>
            <Grid item xs={12} md={10}>
              <Box>
                <Link
                  component={RouteLink}
                  to="/s/hhlab/sample"
                  color={"initial"}
                >
                  <Typography fontWeight={"bold"}>hhlab/sample</Typography>
                </Link>

                <Typography variant="body2">
                  Run, compile and execute JavaScript for Scientific Computing
                  and Data Visualization TOTALLY TOTALLY TOTALLY in your
                  BROWSER! An open source scienti…
                </Typography>

                <Stack direction="row" alignItems={"center"} spacing={1} mt={1}>
                  <Typography
                    variant="body2"
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <FavoriteBorderOutlined
                      fontSize="small"
                      sx={{ mr: "5px" }}
                    />{" "}
                    185
                  </Typography>

                  <Typography variant="body2">Updated Apr 7</Typography>
                </Stack>
              </Box>
            </Grid>

            <Grid item xs={12} md={2}>
              <Box sx={{ textAlign: "right" }}>
                <LoadingButton
                  color="inherit"
                  variant="outlined"
                  loading={loading}
                  loadingPosition="start"
                  onClick={handleLike}
                  startIcon={<FavoriteBorderOutlined />}
                >
                  Like
                </LoadingButton>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

const Timeline = () => {
  return (
    <>
      {Array.from({ length: 10 }).map((_, index) => {
        return (
          <>
            <Box key={index}>
              <UserFeed />
            </Box>

            <Divider sx={{ my: 2 }} />
          </>
        );
      })}

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Pagination count={5} />
      </Box>
    </>
  );
};

export default Timeline;
