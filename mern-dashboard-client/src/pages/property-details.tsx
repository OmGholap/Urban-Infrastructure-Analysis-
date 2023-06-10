import { Typography, Box, Stack } from "@mui/material";
import { useDelete, useGetIdentity, useShow } from "@refinedev/core";
import { useParams, useNavigate } from "react-router-dom";
import {
    ChatBubble,
    Delete,
    Edit,
    Phone,
    Place,
    Star,
} from "@mui/icons-material";

import { CustomButton } from "components";


function checkImage(url: any) {
    const img = new Image();
    img.src = url;
    return img.width !== 0 && img.height !== 0;
}


const PropertyDetails = () => {
    const navigate = useNavigate();
    const { data: user } = useGetIdentity({
        v3LegacyAuthProviderCompatible: true,
    });
    const { queryResult } = useShow();
    const { mutate } = useDelete();
    const { id } = useParams();

    const { data, isLoading, isError } = queryResult;

    const propertyDetails = data?.data ?? {};


    const handleImageProcessing = async () => {
        const formData = new FormData();
        console.log(propertyDetails.photo.toString());
        const image_url = propertyDetails.photo
        formData.append('image', image_url);

        try {
        const response = await fetch('http://localhost:8000/process-image', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            const result = await response.json();
            console.log(result);
        } else {
            console.error('Image processing failed.');

        }
        } catch (error) {
        console.error('Error:', error);
        }
        }

//     const canvasRef = useRef(null);

//     useEffect(() => {
//     const loadOpenCv = async () => {
//       try {
//         await new Promise((resolve, reject) => {
//           const script = document.createElement("script");
//           script.src = "opencv.js";
//           script.async = true;
//           script.onload = resolve;
//           script.onerror = reject;
//           document.body.appendChild(script);
//         });
        
//         // OpenCV.js is ready
//         handleImageProcessing();
//       } catch (error) {
//         console.error("Failed to load OpenCV.js:", error);
//       }
//     };

//     loadOpenCv();
//   }, []);

//   const handleImageProcessing = () => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");
//     const img = new Image();
//     img.src = "path/to/your/image.jpg";
//     img.onload = () => {
//       ctx.drawImage(img, 0, 0);
//       const mat = cv.imread(canvas);
//       const grayMat = new cv.Mat();
//       cv.cvtColor(mat, grayMat, cv.COLOR_BGR2GRAY);
//       const contours = new cv.MatVector();
//       const hierarchy = new cv.Mat();
//       cv.findContours(
//         grayMat,
//         contours,
//         hierarchy,
//         cv.RETR_EXTERNAL,
//         cv.CHAIN_APPROX_SIMPLE
//       );
//       console.log("Number of buildings:", contours.size());
//       mat.delete();
//       grayMat.delete();
//       contours.delete();
//       hierarchy.delete();
//     };
//   };


    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Something went wrong!</div>;
    }

    const isCurrentUser = user.email === propertyDetails.creator.email;

    const handleDeleteProperty = () => {
        const response = confirm(
            "Are you sure you want to delete this property?",
        );
        if (response) {
            mutate(
                {
                    resource: "properties",
                    id: id as string,
                },
                {
                    onSuccess: () => {
                        navigate("/properties");
                    },
                },
            );
        }
    };

    return (
        <Box
            borderRadius="15px"
            padding="20px"
            bgcolor="#FCFCFC"
            width="fit-content"
        >
            <Typography fontSize={25} fontWeight={700} color="#11142D">
                Details
            </Typography>

            <Box
                mt="20px"
                display="flex"
                flexDirection={{ xs: "column", lg: "row" }}
                gap={4}
            >
                <Box flex={1} maxWidth={764}>
                    <img
                        src={propertyDetails.photo}
                        alt="property_details-img"
                        height={546}
                        style={{ objectFit: "cover", borderRadius: "10px" }}
                        className="property_details-img"
                    />
    	            {/* <Box>
                        <canvas ref={canvasRef} width={800} height={600} />
                    </Box> */}
                    <Box>
                        <CustomButton
                            title="Analyse"
                            backgroundColor="#475BE8"
                            color="#FCFCFC"
                            fullWidth
                            handleClick={handleImageProcessing}
                        />
                    </Box>
                    
                    <Box mt="15px">
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            flexWrap="wrap"
                            alignItems="center"
                        >
                            <Typography
                                fontSize={18}
                                fontWeight={500}
                                color="#11142D"
                                textTransform="capitalize"
                            >
                                {/* {propertyDetails.imageType} */}
                            </Typography>
                            {/* <Box>
                                {[1, 2, 3, 4, 5].map((item) => (
                                    <Star
                                        key={`star-${item}`}
                                        sx={{ color: "#F2C94C" }}
                                    />
                                ))}
                            </Box> */}
                        </Stack>

                        <Stack
                            direction="row"
                            flexWrap="wrap"
                            justifyContent="space-between"
                            alignItems="center"
                            gap={2}
                        >
                            <Box>
                                <Typography
                                    fontSize={22}
                                    fontWeight={600}
                                    mt="10px"
                                    color="#11142D"
                                >
                                    {propertyDetails.title}
                                </Typography>
                                <Stack
                                    mt={0.5}
                                    direction="row"
                                    alignItems="center"
                                    gap={0.5}
                                >
                                    <Place sx={{ color: "#808191" }} />
                                    <Typography fontSize={14} color="#808191">
                                        {propertyDetails.location}
                                    </Typography>
                                </Stack>
                            </Box>

                            <Box>
                                {/* <Typography
                                    fontSize={16}
                                    fontWeight={600}
                                    mt="10px"
                                    color="#11142D"
                                >
                                    Buildings
                                </Typography> */}
                                <Stack
                                    direction="row"
                                    alignItems="flex-end"
                                    gap={1}
                                >
                                    <Typography
                                        fontSize={25}
                                        fontWeight={700}
                                        color="#475BE8"
                                    >
                                        {/* {propertyDetails.buildings} */}
                                    </Typography>
                                    <Typography
                                        fontSize={14}
                                        color="#808191"
                                        mb={0.5}
                                    >
                                        
                                    </Typography>
                                </Stack>
                            </Box>
                        </Stack>

                        <Stack mt="25px" direction="column" gap="10px">
                            <Typography fontSize={18} color="#11142D">
                                Description
                            </Typography>
                            <Typography fontSize={14} color="#808191">
                                {propertyDetails.description}
                            </Typography>
                        </Stack>
                    </Box>
                </Box>

                <Box
                    width="100%"
                    flex={1}
                    maxWidth={326}
                    display="flex"
                    flexDirection="column"
                    gap="20px"
                >
                    <Stack
                        width="100%"
                        p={2}
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        border="1px solid #E4E4E4"
                        borderRadius={2}
                    >
                        <Stack
                            mt={2}
                            justifyContent="center"
                            alignItems="center"
                            textAlign="center"
                        >
                            <img
                                src={
                                    checkImage(propertyDetails.creator.avatar)
                                        ? propertyDetails.creator.avatar
                                        : "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"
                                }
                                alt="avatar"
                                width={90}
                                height={90}
                                style={{
                                    borderRadius: "100%",
                                    objectFit: "cover",
                                }}
                            />

                            <Box mt="15px">
                                <Typography
                                    fontSize={18}
                                    fontWeight={600}
                                    color="#11142D"
                                >
                                    {propertyDetails.creator.name}
                                </Typography>
                                <Typography
                                    mt="5px"
                                    fontSize={14}
                                    fontWeight={400}
                                    color="#808191"
                                >
                                    Contributor
                                </Typography>
                            </Box>

                            {/* <Stack
                                mt="15px"
                                direction="row"
                                alignItems="center"
                                gap={1}
                            >
                                <Place sx={{ color: "#808191" }} />
                                <Typography
                                    fontSize={14}
                                    fontWeight={400}
                                    color="#808191"
                                >
                                    North Carolina, USA
                                </Typography>
                            </Stack> */}

                            <Typography
                                mt={1}
                                fontSize={16}
                                fontWeight={600}
                                color="#11142D"
                            >
                                {propertyDetails.creator.allProperties.length}{" "}
                                Properties
                            </Typography>
                        </Stack>

                        <Stack
                            width="100%"
                            mt="25px"
                            direction="row"
                            flexWrap="wrap"
                            gap={2}
                        >
                            <CustomButton
                                title={!isCurrentUser ? "Message" : "Edit"}
                                backgroundColor="#475BE8"
                                color="#FCFCFC"
                                fullWidth
                                icon={
                                    !isCurrentUser ? <ChatBubble /> : <Edit />
                                }
                                handleClick={() => {
                                    if (isCurrentUser) {
                                        navigate(
                                            `/properties/edit/${propertyDetails._id}`,
                                        );
                                    }
                                }}
                            />
                            <CustomButton
                                title={!isCurrentUser ? "Call" : "Delete"}
                                backgroundColor={
                                    !isCurrentUser ? "#2ED480" : "#d42e2e"
                                }
                                color="#FCFCFC"
                                fullWidth
                                icon={!isCurrentUser ? <Phone /> : <Delete />}
                                handleClick={() => {
                                    if (isCurrentUser) handleDeleteProperty();
                                }}
                            />
                        </Stack>
                    </Stack>

                    {/* <Stack>
                        <img
                            src="https://serpmedia.org/scigen/images/googlemaps-nyc-standard.png?crc=3787557525"
                            width="100%"
                            height={306}
                            style={{ borderRadius: 10, objectFit: "cover" }}
                        />
                    </Stack> */}

                    <Box>
                        {/* <CustomButton
                            title="Book Now"
                            backgroundColor="#475BE8"
                            color="#FCFCFC"
                            fullWidth
                        /> */}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default PropertyDetails;
