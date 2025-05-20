import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './dataoptions.css';

const CMIP6_OPTIONS = [
    { value: "ssp119", label: "SSP1-1.9" },
    { value: "ssp126", label: "SSP1-2.6" },
    { value: "ssp434", label: "SSP4-3.4" },
    { value: "ssp534OS", label: "SSP5-3.4OS" },
    { value: "ssp245", label: "SSP2-4.5" },
    { value: "ssp460", label: "SSP4-6.0" },
    { value: "ssp370", label: "SSP3-7.0" },
    { value: "ssp585", label: "SSP5-8.5" },
];

const DataOptions = () => {
    const [cmip6Selection, setCmip6Selection] = useState('');
    const [csvFiles, setCsvFiles] = useState([]);
    const [entryType, setEntryType] = useState('');
    const [csvCount, setCsvCount] = useState(1);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [downloadStatus, setDownloadStatus] = useState('');
    const [continuePage, setContinuePage] = useState(''); // Define continuePage state

    const handleCmip6SelectionChange = (event) => {
        setCmip6Selection(event.target.value);
    };

    const handleEntryTypeChange = (event) => {
        setEntryType(event.target.value);
    };

    const handleCsvCountChange = (event) => {
        setCsvCount(event.target.value);
    };

    const handleStartDateChange = (event) => {
        setStartDate(event.target.value);
    };

    const handleEndDateChange = (event) => {
        setEndDate(event.target.value);
    };

    const handleFileChange = (event) => {
        setCsvFiles(Array.from(event.target.files));
    };

    const navigate = useNavigate();


    const handleDownloadSubmit = async () => {
        setDownloadStatus('Downloading');
        try {
            let url, bodyContent;
            if (entryType === 'era5') {
                url = 'http://10.7.192.244:5000/download_era5';
                bodyContent = { startDate, endDate };
            } else if (entryType === 'cmip6') {
                url = 'http://10.7.192.244:5000/download_cmip6';
                bodyContent = { startDate, endDate, cmip6Selection };
            } else {
                throw new Error('Invalid entry type for download.');
            }

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bodyContent),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const responseData = await response.json();
            setDownloadStatus('Download Completed');
            console.log(responseData);

        } catch (error) {
            console.error(`Error during ${entryType} data fetch:`, error);
            setDownloadStatus('Failed to download data');
        }
    };

    const handleManualSubmit = async () => {
        setDownloadStatus('Submitting');
        const formData = new FormData();
        formData.append('startDate', startDate);
        formData.append('endDate', endDate);

        csvFiles.forEach((file) => {
            formData.append('file', file);
        });

        try {
            const response = await fetch('http://10.7.192.244:5000/submit_manual_data', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const responseData = await response.json();
            setDownloadStatus('Submission Completed');
            console.log(responseData);

        } catch (error) {
            console.error('Error during manual data submission:', error);
            setDownloadStatus('Failed to submit data');
        }
    };

    const handleContinue = () => {
        // Determine continue page based on entryType
        if (entryType === 'manual') {
            setContinuePage('/ManualPage');
        } else if (entryType === 'cmip6') {
            setContinuePage('/Cmip6Page');
        } else if (entryType === 'era5') {
            setContinuePage('/Era5Page');
        } else {
            // Handle invalid selection
            alert('Please select an entry type.');
        }
    };

    useEffect(() => {
        if (continuePage) {
            navigate(continuePage);
        }
    }, [continuePage, navigate]);

    const handleHomeClick = () => {
        navigate('/'); // Assuming '/' is your home route
    };
    

    const renderCsvUpload = (count) => {
        return [...Array(count).keys()].map(index => (
            <div key={index} className='csv-number'>
                <label>CSV File {index + 1}:</label>
                <input
                    className='input-file'
                    type="file"
                    accept=".xlsx" // Assuming .xlsx files are required based on your backend expectation
                    onChange={handleFileChange}
                    multiple
                />
            </div>
        ));
    };

    return (
        <div className="data-entry-container">
            <h1>DATA ENTRY PAGE</h1>
            <h2>Select Entry Type</h2>
            <select value={entryType} onChange={handleEntryTypeChange} className='entry-type-select'>
                <option value=""></option>
                <option value="manual">Manually</option>
                <option value="cmip6">CMIP6</option>
                <option value="era5">ERA 5</option>
            </select>

            {entryType === 'manual' && (
                <>
                    <div>
                        <h3>Enter Dates</h3>
                        <label className='date-label'>Start Date:</label>
                        <input className='input-date' type="date" value={startDate} onChange={handleStartDateChange} />
                        <label className='date-label'>End Date:</label>
                        <input className='input-date' type="date" value={endDate} onChange={handleEndDateChange} />
                    </div>
                    <div>
                        <h3>Number of CSV Files:</h3>
                        <input className='input' type="number" value={csvCount} onChange={handleCsvCountChange} min="1" />
                        {renderCsvUpload(csvCount)}
                    </div>
                    <div>
                        <button className='manualbutton' onClick={handleManualSubmit}>Submit Data</button>
                    </div>
                    <div>
                        <p className={`download-status ${downloadStatus === 'Submitting' ? 'downloading-dots' : ''}`}>{downloadStatus}</p>
                    </div>
                </>
            )}

            {entryType === 'cmip6' && (
                <>
                    <div className="cmip6-options">
                        <h2>Experiment</h2>
                        <p>At least one selection must be made</p>
                        {CMIP6_OPTIONS.map((option) => (
                            <label key={option.value}>
                                <input
                                    type="radio"
                                    name="cmip6-option"
                                    value={option.value}
                                    checked={cmip6Selection === option.value}
                                    onChange={handleCmip6SelectionChange}
                                />
                                {option.label}
                            </label>
                        ))}
                    </div>
                    <div>
                        <h3>Enter Dates</h3>
                        <label className='date-label'>Start Date:</label>
                        <input className='input-date' type="date" value={startDate} onChange={handleStartDateChange} />
                        <label className='date-label'>End Date:</label>
                        <input className='input-date' type="date" value={endDate} onChange={handleEndDateChange} />
                        <div>
                            <button className='cmip6button' onClick={handleDownloadSubmit}>Download Data</button>
                        </div>
                        <div>
                            <p className={`download-status ${downloadStatus === 'Downloading' ? 'downloading-dots' : ''}`}>{downloadStatus}</p>
                        </div>
                    </div>
                </>
            )}

            {entryType === 'era5' && (
                <>
                    <div>
                        <h3>Enter Dates</h3>
                        <label className='date-label'>Start Date:</label>
                        <input className='input-date' type="date" value={startDate} onChange={handleStartDateChange} />
                        <label className='date-label'>End Date:</label>
                        <input className='input-date' type="date" value={endDate} onChange={handleEndDateChange} />
                        <div>
                            <button className='era5button' onClick={handleDownloadSubmit}>Download Data</button>
                        </div>
                        <div>
                            <p className={`download-status ${downloadStatus === 'Downloading' ? 'downloading-dots' : ''}`}>{downloadStatus}</p>
                        </div>
                    </div>
                </>
            )}

            <div className="info-box-container">
                <div className="info-box">
                    Hover over me for info!
                    <div className="info-content">
                        Here is some information about the data entry process. You can put any content here.
                    </div>
                </div>
            </div>

            <div>
                <button className='continue-button' onClick={handleContinue}>Continue</button>
                <button className='home-button' onClick={handleHomeClick}>Home</button>  {/* New Home button */}
            </div>
        </div>
    );
};

export default DataOptions;
