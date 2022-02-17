import { makeStyles } from "@mui/styles";

export const useStyle = makeStyles((theme) => ({
  bannerDetail: {
    minHeight: "300px",
    height: "calc(100vh / 1.5)",
    maxHeight: "500px",
    backgroundPosition: "top center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    color: "#fff",
    // opacity: 0.5,
    background:
      "linear-gradient(to bottom right, rgba(31.5, 31.5, 31.5, 1), rgba(31.5, 31.5, 31.5, 0.84))",
    // zIndex: 1,
  },
  containerContentDetail: {
    display: "flex",
    maxWidth: "80%",
    width: "calc(100vw/1.5)",
    minWidth: "200px",
    margin: "auto",
    height: "100%",
    alignItems: "center",
  },
  posterDetail: {
    flex: 1,
    cursor: "pointer",
  },
  contentDetail: {
    flex: 3,
    marginLeft: "30px",
    lineHeight: "40px",
  },
  bodyDetail: {
    maxWidth: "1400px",
    minWidth: "200px",
    width: "auto",
    margin: "auto",
    marginBottom: "35px",
  },
  cardMembers: {
    minWidth: "200px",
    width: "200px",
    maxWidth: "200px",
    marginTop: "15px",
    border: "1px #ddd solid",
    borderRadius: "8px",
    boxShadow: "none",
  },
  seeMoreDetail: {
    display: "inherit",
    cursor: "pointer",
    alignItems: "center",
    fontSize: "20px",
  },
}));
