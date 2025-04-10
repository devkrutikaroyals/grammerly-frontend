import React, { useState, useEffect } from 'react';
import { FaFileDownload } from 'react-icons/fa';
import { createClient } from '@supabase/supabase-js';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import '../styles/History.css';

// 🔐 Supabase Credentials
const supabaseUrl = 'https://kvcgrnrukivnzauakfoa.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2Y2dybnJ1a2l2bnphdWFrZm9hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk0NDg5NDYsImV4cCI6MjA1NTAyNDk0Nn0.IB8lXkU9P7nk1bvzrq-zcXaERXYf5zsiGiDeEDTY9ck';

const supabase = createClient(supabaseUrl, supabaseKey);

const HistoryPage = () => {
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  // 🔽 Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from('history').select('*');
      console.log("Fetched Data:", data);
      console.log("Fetch Error:", error);

      if (error) alert("Error fetching data from Supabase: " + error.message);
      setHistoryData(data || []);
      setLoading(false);
    };
    fetchData();
  }, []);

  // 🔍 Filtered Data
  const filteredData = historyData.filter(item =>
    Object.values(item).some(value =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const indexOfLast = currentPage * recordsPerPage;
  const currentRecords = filteredData.slice(indexOfLast - recordsPerPage, indexOfLast);
  const totalPages = Math.ceil(filteredData.length / recordsPerPage);

  // 📄 Export PDF
  const downloadPDF = () => {
    const doc = new jsPDF({ orientation: 'landscape', unit: 'pt', format: 'a4' });
    doc.text('History Records', 40, 30);

    autoTable(doc, {
      startY: 50,
      headStyles: { fillColor: [22, 160, 133], halign: 'center' },
      styles: { fontSize: 9, cellPadding: 4 },
      head: [['ID', 'User ID', 'Email', 'Statement', 'Issues', 'Result', 'Free Usage']],
      body: historyData.map(item => [
        item.id,
        item.user_id,
        item.email,
        item.statement,
        item.issues,
        item.result || '-',
        item.is_free_usage ? 'Yes' : 'No'
      ])
    });

    doc.save(`history_export_${new Date().toISOString().slice(0, 10)}.pdf`);
  };

  // 🔄 Pagination Handlers
  const handlePrev = () => currentPage > 1 && setCurrentPage(prev => prev - 1);
  const handleNext = () => currentPage < totalPages && setCurrentPage(prev => prev + 1);

  if (loading) return <div className="loading">Loading history data...</div>;

  return (
    <div className="history-page">
      {/* 🔺 Header Section */}
      <div className="page-header">
        <h1>History Records</h1>
        <button onClick={downloadPDF} className="download-button">
          <FaFileDownload className="download-icon" /> Download PDF
        </button>
      </div>

      {/* 🔍 Search */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search history..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // Reset page
          }}
        />
      </div>

      {/* 📊 Table */}
      <div className="history-table-container">
        <table className="history-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>User ID</th>
              <th>Email</th>
              <th>Statement</th>
              <th>Issues</th>
              <th>Result</th>
              <th>Free Usage</th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.length > 0 ? (
              currentRecords.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.user_id}</td>
                  <td>{item.email}</td>
                  <td>{item.statement}</td>
                  <td>{item.issues}</td>
                  <td>{item.result || '-'}</td>
                  <td className={item.is_free_usage ? 'is-free-usage-yes' : 'is-free-usage-no'}>
                    {item.is_free_usage ? 'Yes' : 'No'}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="no-results">No history records found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 🔁 Pagination */}
      {filteredData.length > recordsPerPage && (
        <div className="pagination">
          <button onClick={handlePrev} disabled={currentPage === 1}>Previous</button>
          <span>Page {currentPage} of {totalPages}</span>
          <button onClick={handleNext} disabled={currentPage === totalPages}>Next</button>
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
