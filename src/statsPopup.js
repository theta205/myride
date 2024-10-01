import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import './page.css';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import axios from 'axios';
import './statsPopup.css'

const PopupWithStatInput = ({ trigger }) => {
  const [inputData, setInputData] = useState({
    year: '',
    customYear: '',
    make: '',
    customMake: '',
    model: '',
    customModel: '',
    power: '',
    torque: '',
    drivetrain: '',
    hashtag: '',
  });

  const [years, setYears] = useState([]);
  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);

  useEffect(() => {
    fetchYears();
  }, []);

  useEffect(() => {
    if (inputData.year && inputData.year !== 'Other') {
      fetchMakes(inputData.year);
    } else {
      setMakes([]);
      setModels([]);
    }
  }, [inputData.year]);

  useEffect(() => {
    if (inputData.make && inputData.make !== 'Other') {
      fetchModels(inputData.year, inputData.make);
    } else {
      setModels([]);
    }
  }, [inputData.make]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setInputData((prevData) => {
      // Reset Make and Model when Year is changed
      if (name === 'year') {
        return {
          ...prevData,
          year: value,
          customYear: '',
          make: '', // Reset make
          customMake: '', // Reset custom make input
          model: '', // Reset model
          customModel: '', // Reset custom model input
        };
      }

      // Reset Model when Make is changed
      if (name === 'make') {
        return {
          ...prevData,
          make: value,
          customMake: '', // Reset custom make input
          model: '', // Reset model
          customModel: '', // Reset custom model input
        };
      }

      // For other inputs, just update as usual
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Data:', inputData);
    // Handle form submission logic here
  };

  const fetchYears = async () => {
    try {
      const response = await axios.get(
        `https://public.opendatasoft.com/api/records/1.0/search/?dataset=all-vehicles-model&q=&facet=year`
      );
  
      // Get the years from the API response
      const yearsList = response.data.facet_groups[0]?.facets.map((facet) => parseInt(facet.name)) || [];
  
      // Sort the years in descending order
      const sortedYears = yearsList.sort((a, b) => b - a);
  
      // Determine the last year from the API
      const lastYear = sortedYears.length > 0 ? sortedYears[sortedYears.length - 1] : new Date().getFullYear();
  
      // Generate the years from 1900 to the last year
      const additionalYears = [];
      for (let year = lastYear - 1; year >= 1900; year--) {
        additionalYears.push(year);
      }
  
      // Combine the sorted API years with the additional years from 1900
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
      const makesList = response.data.facet_groups[0]?.facets.map((facet) => facet.name) || [];
      setMakes(makesList.sort()); // Sort makes alphabetically
    } catch (error) {
      console.error('Error fetching makes:', error);
    }
  };

  const fetchModels = async (year, make) => {
    try {
      const response = await axios.get(
        `https://public.opendatasoft.com/api/records/1.0/search/?dataset=all-vehicles-model&q=&facet=model&refine.year=${year}&refine.make=${make}`
      );
      const modelsList = response.data.facet_groups[0]?.facets.map((facet) => facet.name) || [];
      setModels(modelsList.sort()); // Sort models alphabetically
    } catch (error) {
      console.error('Error fetching models:', error);
    }
  };
 

  return (
    <div>
      <Popup trigger={trigger} position="bottom center" closeOnDocumentClick>
        <div className="popup-content">
          <h3>Enter Your Details</h3>
          <form onSubmit={handleSubmit}>
            <Row>
              <Col>
                <Row><label htmlFor="year">Year:</label></Row>
                <select
                  name= "year"
                  className='stats-dropdowns'
                  value={inputData.year || ''}
                  onChange={handleInputChange}
                  required
                >
                  <option value="" disabled>Select a year</option>
                  {years.map((year) => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
                </Col>
            </Row>

            <Row>
              <Col>
                <Row><label htmlFor="make">Make:</label></Row>
                <select
                  name="make"
                  className='stats-dropdowns'
                  value={inputData.make || ''}
                  onChange={handleInputChange}
                  required
                  disabled={!inputData.year || (inputData.year === 'Other' && inputData.customYear==='')}
                  style={{ backgroundColor: !inputData.year ? '#d3d3d3' : 'white' }}
                >
                  <option value="" disabled>Select a make</option>
                  {makes.map((make) => (
                    <option key={make} value={make}>{make}</option>
                  ))}
                    <option value="Other">Other</option> {/* Add Other option */}

                </select>
                </Col>
                <Col>
                {(inputData.make === 'Other') && (
                  <input
                    type="text"
                    name="customMake"
                    placeholder="Enter custom make"
                    value={inputData.customMake}
                    onChange={handleInputChange}
                    required
                  />
                )}
              </Col>
            </Row>

            <Row>
              <Col>
                <Row><label htmlFor="model">Model:</label></Row>
                <select
                  name="model"
                  className='stats-dropdowns'
                  value={inputData.model || ''}
                  onChange={handleInputChange}
                  required
                  disabled={!inputData.make || (inputData.make === 'Other' && inputData.customMake==='')}
                  style={{ backgroundColor: !inputData.make ? '#d3d3d3' : 'white' }}
                >
                  <option value="" disabled>Select a model</option>
                  {models.map((model) => (
                    <option key={model} value={model}>{model}</option>
                  ))}
                <option value="Other">Other</option> {/* Add Other option */}

                </select>
              </Col>
              <Col>
                {inputData.model === 'Other' && (
                  <input
                    type="text"
                    name="customModel"
                    placeholder="Enter custom model"
                    value={inputData.customModel}
                    onChange={handleInputChange}
                    required
                  />
                )}
              </Col>
            </Row>

            <Row>
              <Col>
                <label htmlFor="power">Power (hp):</label>
                <input
                  type="text"
                  name="power"
                  value={inputData.power}
                  onChange={handleInputChange}
                  required
                />
              </Col>
              <Col>
                <label htmlFor="torque">Torque (lb/ft):</label>
                <input
                  type="text"
                  name="torque"
                  value={inputData.torque}
                  onChange={handleInputChange}
                  required
                />
              </Col>
              <Col>
              <label htmlFor="drivetrain">Drivetrain:</label>

              <select
                    name="drivetrain"
                    value={inputData.drivetrain || ''}
                    onChange={handleInputChange}
                    required
                    style={{ backgroundColor: 'white' }}
                    >
                    <option value="">Select drivetrain</option> {/* Default empty option */}
                    <option value="RWD">RWD</option>
                    <option value="AWD">AWD</option>
                    <option value="FWD">FWD</option>
                    <option value="4WD">4WD</option>
                </select>

              </Col>
            </Row>

            <Row>
              <Col>
                <label htmlFor="hashtag">Hashtag:</label>
                <input
                  type="text"
                  name="hashtag"
                  value={inputData.hashtag}
                  onChange={handleInputChange}
                  required
                />
              </Col>
            </Row>
            <button type="submit">Submit</button>
          </form>
        </div>
      </Popup>
    </div>
  );
};

export default PopupWithStatInput;
