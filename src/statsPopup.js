import React, { useState, useRef,useEffect } from 'react';
import Popup from 'reactjs-popup';
import './page.css';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import axios from 'axios';
import './statsPopup.css';
import { Form, Dropdown, DropdownButton } from 'react-bootstrap';
import { useUser } from '@clerk/clerk-react';
import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage } from '@cloudinary/react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { makeAspectCrop } from 'react-image-crop';
import { heic } from '@cloudinary/url-gen/qualifiers/format';

const PopupWithStatInput = ({ trigger, onSub, input }) => {
    const [inputData, setInputData] = useState(input);
    const hashtags = [
        '#Manual',
        '#Bagged',
        '#Lifted',
        '#Drift',
        '#Offroad',
        '#Static',
        '#Slammed',
        '#JDM',
        '#Euro',
        '#Muscle'
    ];
    const [years, setYears] = useState([]);
    const [makes, setMakes] = useState([]);
    const [models, setModels] = useState([]);
    const [selectedHashtags, setSelectedHashtags] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Loading state
    const { user, isLoaded, isSignedIn } = useUser();
    const [imageSelected, setImageSelected] = useState(null);
    const [imageUrl, setImageUrl] = useState("");
    const[resized, setResize] = useState(false)
    const [image, setImage] = useState(null); // For the uploaded image
    const [croppedImage, setCroppedImage] = useState(null); // Cropped image 
    const [croppedImageSend, setCroppedImageSend] = useState(null); // Cropped image
    const [imageRef, setImageRef] = useState(null); // Image reference for cropping
    const [nh,setNH]= useState(1)
    const [nw,setNW]= useState(1)
    const [aspect,setAspect]= useState(null)




    useEffect(() => {
        const fetchData = async () => {
            await fetchYears(); // Fetch years on component mount
            setIsLoading(false); // Set loading to false once data is fetched
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (inputData.year && inputData.year !== 'Other'  && isLoaded) {
            fetchMakes(inputData.year);
        } else {
            console.log("showing no makes and models")
            setMakes([]);
            setModels([]);
        }
    }, [inputData.year]);

    useEffect(() => {
        if (inputData.make && inputData.make !== 'Other' && isLoaded ) {
            fetchModels(inputData.year, inputData.make);
        } else {
            console.log("showing no makes and models")
            setModels([]);
        }
    }, [inputData.make, inputData.year]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setInputData((prevData) => {
            if (name === 'year') {
                return {
                    ...prevData,
                    year: value,
                    make: '',
                    customMake: '',
                    model: '',
                    customModel: '',
                };
            }

            if (name === 'make') {
                return {
                    ...prevData,
                    make: value,
                    customMake: '',
                    model: '',
                    customModel: '',
                };
            }

            return {
                ...prevData,
                [name]: value,
            };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const submittedData = {
            ...inputData,
            model: inputData.model === 'Other' ? inputData.customModel : inputData.model,
            make: inputData.make === 'Other' ? inputData.customMake : inputData.make,
            hashtags: selectedHashtags.join(' ')
        };

        console.log('Submitted Data:', submittedData);

        if (onSub) {
            onSub(submittedData, croppedImageSend);
            console.log("just subbed " ,croppedImage)

        }
    };

    const fetchYears = async () => {
        try {
            const response = await axios.get(
                `https://public.opendatasoft.com/api/records/1.0/search/?dataset=all-vehicles-model&q=&facet=year`
            );

            const yearsList = response.data.facet_groups[0]?.facets.map((facet) => parseInt(facet.name)) || [];
            const sortedYears = yearsList.sort((a, b) => b - a);
            const lastYear = sortedYears.length > 0 ? sortedYears[sortedYears.length - 1] : new Date().getFullYear();
            const additionalYears = [];
            for (let year = lastYear - 1; year >= 1900; year--) {
                additionalYears.push(year);
            }
            const finalYearsList = [...sortedYears, ...additionalYears];

            setYears(finalYearsList);
        } catch (error) {
            console.error('Error fetching years:', error);
        }
    };

    const fetchMakes = async (year) => {
        try {
            const response = await axios.get(
                `https://public.opendatasoft.com/api/records/1.0/search/?dataset=all-vehicles-model&q=&facet=make&refine.year=${year}`
            );

            if (response.data.facet_groups && response.data.facet_groups.length > 0) {
                const makesList = response.data.facet_groups[0]?.facets.map((facet) => facet.name) || [];
                setMakes(makesList.sort());
            } else {
                console.warn('No makes found for the selected year.');
                setMakes([]);
            }
        } catch (error) {
            console.error('Error fetching makes:', error);
        }
    };

    const fetchModels = async (year, make) => {
        try {
            const response = await axios.get(
                `https://public.opendatasoft.com/api/records/1.0/search/?dataset=all-vehicles-model&q=&facet=model&refine.year=${year}&refine.make=${make}`
            );

            if (response.data.facet_groups && response.data.facet_groups.length > 0) {
                const modelsList = response.data.facet_groups[0]?.facets.map((facet) => facet.name) || [];
                setModels(modelsList.sort());
            } else {
                console.warn('No models found for the selected make and year.');
                setModels([]);
            }
        } catch (error) {
            console.error('Error fetching models:', error);
        }
    };


    const colorIndexMap = {
        'lightcoral': 1,
        'khaki': 2,
        'lightblue': 3,
        'lightgreen': 4,
        'lightsalmon': 5,
        'mistyrose': 6, 
        'mediumpurple': 7,
        'rgba(78, 78, 78, 0.73)': 8,
        'sandybrown': 9
    };
    
    const getColorIndex = (color) => {
        return colorIndexMap[color] || 1; // Return the ID or null if not found
    };
    const [selectedSet, setSelectedSet] = useState(getColorIndex(inputData.mainColor));


    // Handle button selection and deselection logic
    const handleButtonClick = (setIndex) => {
        setSelectedSet(setIndex);
  
    // Update the inputData with corresponding lightColor, mainColor, and darkColor values
    setInputData((prevData) => {
      let lightColor, mainColor, darkColor;
      switch (setIndex) {
        case 1:
          lightColor = 'mistyrose';
          mainColor = 'lightcoral';
          darkColor = 'indianred';
          break;
        case 2:
          lightColor = 'lightyellow';
          mainColor = 'khaki';
          darkColor = 'gold';
          break;
        case 3:
          lightColor = 'aliceblue';
          mainColor = 'lightblue';
          darkColor = 'cornflowerblue';
          break;
        case 4:
          lightColor = 'honeydew';
          mainColor = 'lightgreen';
          darkColor = 'mediumseagreen';
          break;
        case 5:
          lightColor = 'bisque';
          mainColor = 'lightsalmon';
          darkColor = 'darksalmon';
          break;
        case 6:
          lightColor = 'mistyrose';
          mainColor = 'pink';
          darkColor = 'palevioletred';
          break;
        case 7:
          lightColor = 'lavender';
          mainColor = 'mediumpurple';
          darkColor = 'rebeccapurple';
          break;
        case 8:
          lightColor = 'rgba(178, 178, 178, 0.73)';
          mainColor = 'rgba(78, 78, 78, 0.73)';
          darkColor = 'rgba(58, 58, 58, 1)';
          break;
        case 9:
          lightColor = 'navajowhite';
          mainColor = 'sandybrown';
          darkColor = 'sienna';
          break;
        default:
          lightColor = '';
          mainColor = '';
          darkColor = '';
      }
      
  
      return {
        ...prevData,
        lightColor,
        mainColor,
        darkColor,
      };
    });
  };
  
  
  // Define a function to apply button styles dynamically based on selection
  const getButtonStyle = (setIndex, id=0) => {
    // Base style for selected or non-selected buttons
    const baseStyle = selectedSet === setIndex
      ? { opacity: 1, borderTop: '2px solid black', borderBottom: '2px solid black' }  // Selected button style (highlighted)
      : { opacity: 1, border: '2px solid transparent' };  // Non-selected button style
    
    // If id === 2, always set the left and right borders
    if (id !== 2) {
      return {
        ...baseStyle,
        borderLeft: selectedSet === setIndex ? '2px solid black' : '2px solid transparent',  // Set left border
        borderRight: selectedSet === setIndex ? '2px solid black' : '2px solid transparent'  // Set right border
      };
    }
  
    // If id is not 2, just return the base style
    return baseStyle;
  };
  const handleSelect = (eventKey) => {
    if (eventKey=="Reset")
        setSelectedHashtags(null)
    // Check if the hashtag is already selected
    if (selectedHashtags.includes(eventKey)) {
        
        // If already selected, remove it
        setSelectedHashtags(selectedHashtags.filter(tag => tag !== eventKey));
    } else {
        // If not selected, add it
        setSelectedHashtags([...selectedHashtags, eventKey]);
    }
};

const onImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) { // Ensure the file is an image
        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result);
            const img = new Image();
            
            img.src = reader.result;
            img.onload = () => {
                console.log("in on load")
                setImageRef(img); // Set the image object for cropping
            };
        };
        reader.readAsDataURL(file);
    } else {
        alert('Please upload a valid image file.');
    }
};

const onImageLoaded = (img) => {
    console.log('Image loaded:', img);
    setImageRef(img); // Reference to the image for cropping
    console.log('Image loaded:', imageRef);

};

const onCropComplete = (crop) => {
    if (crop.width > 0 && crop.height > 0) {
        cropImage(crop);
        console.log("cropped:", crop);
    } else {
        console.error("Invalid crop dimensions:", crop);
    }
};
const imgRef = useRef(null);
const getNatural = () => {
    const displayedWidth = imgRef.current.clientWidth;
    const displayedHeight = imgRef.current.clientHeight;
    setNH(imgRef.current.clientHeight)
    setNW(imgRef.current.clientWidth)

    console.log(`Displayed Width: ${displayedWidth}px`);
    console.log(`Displayed Height: ${displayedHeight}px`);
}
const cropImage = (crop) => {
    if (!imageRef) {
        console.error("Image reference is not set");
        return;
    }

    console.log("Image:", imageRef);
    console.log("nhere",nw)
    console.log("Crop dimensions:", crop.width, crop.height);
    
    if (image && nw<400){
        console.log("in if")

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const scale = 400/nw
        // Set the canvas dimensions to the desired resolution
        // For example, double the original dimensions
        const newWidth = nw * scale;
        const newHeight = nh * scale;

        canvas.width = newWidth;
        canvas.height = newHeight;
        console.log("new",newWidth, newHeight)
        console.log("imageHere",image)
        // Draw the image onto the canvas, scaling it to the new dimensions
        ctx.drawImage(image, 0, 0, nw, nh,0 , 0, newWidth, newHeight)


        // Convert the canvas back to an image (if needed)
        const newImageUrl = canvas.toDataURL(); // This creates a base64-encoded version of the image
        setImage(newImageUrl)
    }
    if (crop.width > 0 && crop.height > 0) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Ensure image is fully loaded
        const naturalWidth = imageRef.naturalWidth;
        const naturalHeight = imageRef.naturalHeight;

    

        // Calculate scale factors
        const scaleX = (naturalWidth / nw);
        const scaleY = (naturalHeight / nh);
        if(((scaleX*crop.width)<400)||(1.25*crop.height>crop.width)){
            if ((scaleX*crop.width)<400){
                crop.width=401/scaleX
                setResize(true)
            }
            if(1.25*crop.height>crop.width){
                setResize(true)
                crop.height =  crop.width/1.25
            }
        }else {
            setResize(false)
        }
        // Calculate new width and height based on crop and scale
        const w = crop.width * scaleX; // New width
        const h = crop.height * scaleY; // New height

        // Set canvas size to the new dimensions
        canvas.width = w; // Set to new width
        canvas.height = h; // Set to new height

        console.log("nat:", naturalWidth, naturalHeight);
        console.log("scales:", scaleX, scaleY);
        console.log("new w and h", nw, nh);

        // Draw the image on the canvas
        ctx.drawImage(
            imageRef,
            crop.x * scaleX,
            crop.y * scaleY,
            w, // Use new width here
            h, // Use new height here
            0,
            0,
            w, // Destination width
            h  // Destination height
        );

        // Get the cropped image as base64
        const base64Image = canvas.toDataURL('image/jpeg');
        setCroppedImageSend(base64Image);
        setCroppedImage(base64Image); // Set the cropped image

    } else {
        console.error("Invalid crop dimensions");
    }
};


  
  
const [crop, setCrop] = useState({ 
    unit: 'px',  // Unit can be 'px' or '%'
    height: 100, 
    width: 150, // Default crop height
    x: 0,        // Default x position of the crop
    y: 0         // Default y position of the crop
    },
    );


  
  return (
    <div style={{ height: "auto", display: 'flex' }}>
            <Popup trigger={trigger} className="popup-content" position="bottom center" closeOnEscape closeOnDocumentClick>
                <form onSubmit={handleSubmit} style={{ justifyContent: 'center', height: "auto" }}>
                    <Col style={{ justifyContent: 'center' }}>
                        <h3>Enter Your Car's Info</h3>
                        <Row>
                            <label htmlFor="imageUpload">Upload Image:</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={onImageUpload}
                                required
                                style={{ marginBottom: '10px' }}
                            />
                        </Row>
                        {image && (
                            <Row>
                                <h4>Uploaded Image:</h4>
                                
                            </Row>
                        )}
                        {image && (
                            <>
                                <ReactCrop
                                    crop={crop}
                                    onComplete={onCropComplete}
                                    // maxHeight={300}
                                    // maxWidth={400}
                                     minHeight={50}
                                     minWidth={50}
                                     maxHeight={400}
                                     maxWidth={400}
                                     aspect={aspect}
                                     keepSelection={true}
                                    onChange={(newCrop) => {
                                        setCrop(newCrop);
                                    }
                                   
                                    }
                                    >
                                    <img src={image}  ref={imgRef} onLoad={getNatural} alt="Uploaded Car" style={{width: '100%', height: '100%' }} />
                                </ReactCrop>
                               { resized && croppedImage&& <text>Image has been resized. The max aspect ratio is 1.25 </text>}
                                {croppedImage && 
                                   
                                (
                                  // <div style={{ width: '380px', height: '300px', overflow: 'hidden' }}> 
                                  
                                   <img 
                                       src={croppedImage} 
                                       alt="Cropped Image" 
                                       style={{ marginTop: '10px', width: 'auto', height:'auto',maxWidth: '100%', maxHeight: '100%', display: 'block' }} 
                                   />
                             //  </div>
                                )}
                            </>
                        )}




            <Row><label htmlFor="year">Year:</label></Row>
                <Row className='stats-rows'>
                    <Form.Select
                    name= "year"
                    className='stats-dropdowns'
                    value={inputData.year || ''}
                    onChange={handleInputChange}
                    required
                    style={{ backgroundColor:'white' }}
                    >
                    <option value="" disabled>Select a year</option>
                    {years.map((year) => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                    </Form.Select>

                </Row>
                <Row><label htmlFor="make">Make:</label></Row>
                <Row className='stats-rows'>
                    <Form.Select
                    name="make"
                    className='stats-dropdowns'
                    value={inputData.make || ''}
                    onChange={handleInputChange}
                    required
                    disabled={!inputData.year }
                    style={{ backgroundColor: !inputData.year ? 'rgb(110,117,124)' : 'white' ,
                    color: !inputData.year ? 'white' : 'black' }}
                    >
                    <option value="" disabled>Select a make</option>
                    {makes.map((make) => (
                        <option key={make} value={make}>{make}</option>
                    ))}
                        <option value="Other">Other</option> {/* Add Other option */}

                    </Form.Select>
                </Row>
            <Row style={{ paddingRight: '20px', justifyContent: 'center'}}>
                {(inputData.make === 'Other') && (
                  <input
                    type="text"
                    className='stats-dropdowns'
                    name="customMake"
                    placeholder="Enter custom make"
                    value={inputData.customMake}
                    onChange={handleInputChange}
                    required
                    style={{width: '342px', margin: '10'}}
                    
                  />
                )}
             </Row>
                <Row><label htmlFor="model">Model:</label></Row>
            <Row className='stats-rows'>
                <Form.Select
                  name="model"
                  className='stats-dropdowns'
                  value={inputData.model || ''}
                  onChange={handleInputChange}
                  required
                  disabled={!inputData.make || (inputData.make === 'Other' && inputData.customMake==='')}
                  style={{ backgroundColor: !inputData.make ? 'rgb(110,117,124)' : 'white' ,
                   color: !inputData.make ? 'white' : 'black' }}

                >
                  <option value="" disabled>Select a model</option>
                  {models.map((model) => (
                    <option key={model} value={model}>{model}</option>
                  ))}
                <option value="Other">Other</option> {/* Add Other option */}

                </Form.Select>
                </Row>
                <Row style={{paddingRight: '20px', justifyContent: 'center'}}>
                {inputData.model === 'Other' && (
                  <input
                    type="text"
                    className='stats-dropdowns'
                    name="customModel"
                    placeholder="Enter custom model"
                    value={inputData.customModel}
                    onChange={handleInputChange}
                    required
                    style={{width: '342px', margin: '10'}}
                  />
                )}
              </Row>

            <Row xs={3} style={{paddingTop:'10px', width: '98%', paddingLeft: '10px'}}>
              <Col style={{textAlign: 'center'}}>
                <label htmlFor="power">Power(hp):</label>
                <input
                  type="number"
                  name="power"
                  style={{ width: '100%', height: '37px'}}
                  value={inputData.power}
                  onChange={handleInputChange}
                  required
                />
              </Col>
              <Col style={{textAlign: 'center'}}>
                <label htmlFor="torque">Torque(lb/ft):</label>
                <input
                  type="number"
                  name="torque"
                  style={{ width: '100%', height: '37px'}}
                  value={inputData.torque}
                  onChange={handleInputChange}
                  required
                />
              </Col>
              <Col style={{textAlign: 'center'}}>
              <label htmlFor="drivetrain" style={{paddingBottom: '8px'}} >Drivetrain: </label>
              <Form.Select
                    name="drivetrain"
                    value={inputData.drivetrain || ''}
                    onChange={handleInputChange}
                    required
                    style={{ backgroundColor: 'rgb(110,117,124)',color:'white', width: '100%', height: '40px'}}
                    >
                    <option value="">Select</option> {/* Default empty option */}
                    <option value="RWD">RWD</option>
                    <option value="AWD">AWD</option>
                    <option value="FWD">FWD</option>
                    <option value="4WD">4WD</option>
                </Form.Select>

              </Col>
            </Row>

            <Row style={{width: '80%'}}>
              <Col>
        <Form.Group controlId="multiSelectHashtags">
            <Form.Label>Select up to 4 Hashtags:</Form.Label>
            <DropdownButton
    id="dropdown-multiselect"
    className='dropdown-m'
    type="button"
    title={(selectedHashtags.length > 0) ? selectedHashtags.join(' ') : 'Select Hashtags'}
    variant="secondary"
    style={{ width: '160px', background: 'white', color: 'grey' }} // Change color here
>
    {hashtags.map((hashtag, index) => (
        <Dropdown.Item
            as="button"
            type="button"
            style={{
                width: '90%',
                color: selectedHashtags.length >= 4 && !selectedHashtags.includes(hashtag) ? 'grey' : 'black',
                pointerEvents: selectedHashtags.length >= 4 && !selectedHashtags.includes(hashtag) ? 'none' : 'auto', 
                opacity: selectedHashtags.length >= 4 && !selectedHashtags.includes(hashtag) ? 0.5 : 1,
                backgroundColor: selectedHashtags.includes(hashtag) ? 'lightgrey' : 'white' // Change selected item color here
               
            }}
            key={index}
            eventKey={selectedHashtags}
            active={selectedHashtags.includes(hashtag)}
            onClick={() => handleSelect(hashtag)}
            value={selectedHashtags}
            onChange={handleInputChange}
        >
            {hashtag}
        </Dropdown.Item>
    ))}
</DropdownButton>
        </Form.Group>
              </Col>
            </Row>
            <Row><label htmlFor="Themes" style={{paddingBottom:'10px'}}>Themes:</label>
            
            </Row>
           <Row style={{paddingBottom: '10px', paddingRight: '10px', paddingLeft: '10px'}}>
            <Col>
                <button 
                type="button" 
                className="color-button"
                style={{ background: 'mistyrose', ...getButtonStyle(1) }}  
                onClick={() => handleButtonClick(1)}  
                />
                <button 
                type="button" className= "color-button"
                style={{ background: 'lightcoral', ...getButtonStyle(1,2) }}
                onClick={() => handleButtonClick(1)}
                />
                <button 
                type="button" className= "color-button"

                style={{ background: 'indianred', ...getButtonStyle(1) }}
                onClick={() => handleButtonClick(1)}
                />
            </Col>
            <Col>
            <button 
                type="button" className= "color-button"
                style={{background: 'lightyellow' , ...getButtonStyle(2) }}
                onClick={() => handleButtonClick(2)}>
                </button>
                <button 
                 type="button" className= "color-button"
                style={{background: 'khaki', ...getButtonStyle(2,2) }}
                onClick={() => handleButtonClick(2)}>
                </button>
                <button 
                 type="button" className= "color-button"
                style={{background: 'gold' , ...getButtonStyle(2) }}
                onClick={() => handleButtonClick(2)}>
                </button>
            </Col>
            <Col>
            <button 
                 type="button" className= "color-button"
                style={{background: 'aliceblue' , ...getButtonStyle(3) }}
                onClick={() => handleButtonClick(3)}>
                </button>
                <button 
                 type="button" className= "color-button"
                style={{background: 'lightblue', ...getButtonStyle(3,2) }}
                onClick={() => handleButtonClick(3)}>
                </button>
                <button 
                 type="button" className= "color-button"
                style={{background: 'cornflowerblue' , ...getButtonStyle(3) }}
                onClick={() => handleButtonClick(3)}>
                </button>
            </Col>
            </Row>
              <Row style={{paddingBottom:'10px', paddingRight:'10px', paddingLeft: '10px'}}>
            <Col>
            <button 
                type="button" 
                className= "color-button"
                style={{background: 'honeydew' , ...getButtonStyle(4) }}
                onClick={() => handleButtonClick(4)}>
                </button>
                <button 
                 type="button" className= "color-button"
                style={{background: 'lightgreen', ...getButtonStyle(4,2)  }}
                onClick={() => handleButtonClick(4)}>
                </button>
                <button 
                 type="button" className= "color-button"
                style={{background: 'mediumseagreen' , ...getButtonStyle(4) }}
                onClick={() => handleButtonClick(4)}>
                </button>
            </Col>
            <Col>
            <button 
                 type="button" className= "color-button"
                style={{background: 'bisque' , ...getButtonStyle(5) }}
                onClick={() => handleButtonClick(5)}>
                </button>
                <button 
                 type="button" className= "color-button"
                style={{background: 'lightsalmon', ...getButtonStyle(5,2) }}
                onClick={() => handleButtonClick(5)}>
                </button>
                <button 
                 type="button" className= "color-button"
                style={{background: 'darksalmon' , ...getButtonStyle(5) }}
                onClick={() => handleButtonClick(5)}>
                </button>
            </Col>
            <Col>
            <button 
                 type="button" className= "color-button"
                style={{background: 'mistyrose' , ...getButtonStyle(6) }}
                onClick={() => handleButtonClick(6)}>
                </button>
                <button 
                 type="button" className= "color-button"
                style={{background: 'pink', ...getButtonStyle(6,2) }}
                onClick={() => handleButtonClick(6)}>
                </button>
                <button 
                 type="button" className= "color-button"
                style={{background: 'palevioletred' , ...getButtonStyle(6) }}
                onClick={() => handleButtonClick(6)}>
                </button>
            </Col>
            </Row>
            <Row style={{paddingBottom:'10px', paddingRight:'10px', paddingLeft: '10px'}}>          
            <Col>
            <button 
                 type="button" className= "color-button"
                style={{background: 'lavender' , ...getButtonStyle(7) }}
                onClick={() => handleButtonClick(7)}>
                </button>
                <button 
                 type="button" className= "color-button"
                style={{background: 'mediumpurple' , ...getButtonStyle(7,2) }}
                onClick={() => handleButtonClick(7)}>
                </button>
                <button 
                 type="button" className= "color-button" 
                style={{background: 'rebeccapurple' , ...getButtonStyle(7) }}
                onClick={() => handleButtonClick(7)}>
                </button>
            </Col>
            <Col>
            <button 
                 type="button" className= "color-button"
                style={{background: 'rgba(178, 178, 178, 0.73)' , ...getButtonStyle(8) }}
                onClick={() => handleButtonClick(8)}>
                </button>
                <button 
                 type="button" className= "color-button"
                style={{background: 'rgba(78, 78, 78, 0.73)' , ...getButtonStyle(8,2) }}
                onClick={() => handleButtonClick(8)}>
                </button>
                <button 
                 type="button" className= "color-button"
                 style={{background: 'rgba(58, 58, 58, 1)' , ...getButtonStyle(8) }}
                onClick={() => handleButtonClick(8)}>
                </button>
            </Col>
            <Col>
            <button 
                 type="button" className= "color-button"
                style={{background: 'navajowhite' , ...getButtonStyle(9) }}
                onClick={() => handleButtonClick(9)}>
                </button>
                <button 
                 type="button" className= "color-button"
                style={{background: 'sandybrown', ...getButtonStyle(9,2) }}
                onClick={() => handleButtonClick(9)}>
                </button>
                <button 
                 type="button" className= "color-button"
                style={{background: 'sienna' , ...getButtonStyle(9) }}
                onClick={() => handleButtonClick(9)}>
                </button>
            </Col>
            
            </Row>
            <Row style={{justifyContent: 'center'}}>
                <button 
                    type="submit" 
                    className="popup-content-button" 
                    style={{width: '90%'}}
                 >
                 Submit
                </button>
                </Row> 
                </Col>

          </form>
      </Popup>
    </div>
  );
};

export default PopupWithStatInput;