import React, { useState, useMemo, useCallback, useEffect } from "react";
import {
  X,
  Calendar,
  Clock,
  CreditCard,
  CheckCircle,
  Users,
  User,
} from "lucide-react";
import "./booking-modal.css";


const BookingModal = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [sessionType, setSessionType] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [visibleSessions, setVisibleSessions] = useState(5);
  const [filters, setFilters] = useState({
    monthYear: "",
    timeZone: "",
    language: "",
    type: "",
  });
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
    billingAddress: "",
    city: "",
    zipCode: "",
    postalCode: "",
    country: "",
  });
  const [promoCode, setPromoCode] = useState({
    code: "",
    discount: 0,
    isValid: false,
    isApplied: false,
  });
  const [promoInput, setPromoInput] = useState("");
  const [promoError, setPromoError] = useState("");

  // Available promo codes
  const validPromoCodes = {
    SAVE20: 20,
    STUDENT15: 15,
    FIRST10: 10,
    WELCOME25: 25,
  };

  const steps = [
    {
      number: 1,
      title: "Session Type",
      description: "Choose your learning preference",
    },
    { number: 2, title: "Schedule", description: "Select date and time" },
    { number: 3, title: "Payment", description: "Enter payment details" },
    { number: 4, title: "Review", description: "Confirm your booking" },
  ];

  const allSessions = useMemo(
    () => [
      {
        id: "1",
        dateRange: "2025-7-21 - 2025-7-23",
        time: "9:00 - 17:00",
        timezone: "Europe/Copenhagen",
        location: "Virtual",
        language: "English",
        seatsLeft: "1",
        price: sessionType === "private" ? "1200 USD" : "800 USD",
      },
      {
        id: "3",
        dateRange: "2025-7-23 - 2025-7-25",
        time: "9:00 - 17:00",
        timezone: "Asia/Tokyo",
        location: "Virtual",
        language: "Japanese",
        seatsLeft: "8",
        price: sessionType === "private" ? "1200 USD" : "800 USD",
      },
      {
        id: "4",
        dateRange: "2025-8-6 - 2025-8-8",
        time: "9:00 - 17:00",
        timezone: "Europe/London",
        location: "Virtual",
        language: "English",
        seatsLeft: "9",
        price: sessionType === "private" ? "1200 USD" : "800 USD",
      },
      {
        id: "5",
        dateRange: "2025-8-11 - 2025-8-13",
        time: "9:00 - 17:00",
        timezone: "Asia/Kolkata",
        location: "Virtual",
        language: "English",
        seatsLeft: "Join Waitlist",
        price: sessionType === "private" ? "1200 USD" : "800 USD",
      },
      {
        id: "6",
        dateRange: "2025-8-15 - 2025-8-17",
        time: "9:00 - 17:00",
        timezone: "America/New_York",
        location: "Virtual",
        language: "English",
        seatsLeft: "15",
        price: sessionType === "private" ? "1200 USD" : "800 USD",
      },
      {
        id: "7",
        dateRange: "2025-8-20 - 2025-8-22",
        time: "9:00 - 17:00",
        timezone: "Europe/Berlin",
        location: "Virtual",
        language: "English",
        seatsLeft: "6",
        price: sessionType === "private" ? "1200 USD" : "800 USD",
      },
      {
        id: "8",
        dateRange: "2025-8-25 - 2025-8-27",
        time: "9:00 - 17:00",
        timezone: "Asia/Singapore",
        location: "Virtual",
        language: "English",
        seatsLeft: "3",
        price: sessionType === "private" ? "1200 USD" : "800 USD",
      },
      {
        id: "9",
        dateRange: "2025-9-1 - 2025-9-3",
        time: "9:00 - 17:00",
        timezone: "Australia/Sydney",
        location: "Virtual",
        language: "English",
        seatsLeft: "11",
        price: sessionType === "private" ? "1200 USD" : "800 USD",
      },
      {
        id: "10",
        dateRange: "2025-9-5 - 2025-9-7",
        time: "9:00 - 17:00",
        timezone: "America/Los_Angeles",
        location: "Virtual",
        language: "Spanish",
        seatsLeft: "7",
        price: sessionType === "private" ? "1200 USD" : "800 USD",
      },
    ],
    [sessionType]
  );

  const [filteredSessions, setFilteredSessions] = useState(allSessions);

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleLoadMore = () => {
    setVisibleSessions((prev) => Math.min(prev + 5, allSessions.length));
  };

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({ ...prev, [filterType]: value }));
  };

  const applyFilters = useCallback(() => {
    let filtered = allSessions;

    // Filter by month/year
    if (filters.monthYear && filters.monthYear !== "Select Month and Year") {
      const selectedMonth = filters.monthYear.toLowerCase();
      filtered = filtered.filter((session) => {
        const sessionDate = session.dateRange.toLowerCase();
        if (selectedMonth.includes("january"))
          return (
            sessionDate.includes("2025-7") || sessionDate.includes("2025-8")
          );
        if (selectedMonth.includes("february"))
          return sessionDate.includes("2025-2");
        if (selectedMonth.includes("march"))
          return sessionDate.includes("2025-3");
        return true;
      });
    }

    // Filter by timezone
    if (filters.timeZone && filters.timeZone !== "Time Zone") {
      filtered = filtered.filter((session) =>
        session.timezone.toLowerCase().includes(filters.timeZone.toLowerCase())
      );
    }

    // Filter by language
    if (filters.language && filters.language !== "Language") {
      filtered = filtered.filter(
        (session) =>
          session.language.toLowerCase() === filters.language.toLowerCase()
      );
    }

    // Filter by type
    if (filters.type && filters.type !== "Type") {
      filtered = filtered.filter(
        (session) =>
          session.location.toLowerCase() === filters.type.toLowerCase()
      );
    }

    setFilteredSessions(filtered);
    setVisibleSessions(5); // Reset visible sessions when filters are applied
  }, [allSessions, filters]);

  const clearFilters = useCallback(() => {
    setFilters({
      monthYear: "",
      timeZone: "",
      language: "",
      type: "",
    });
    setVisibleSessions(5);
    setPromoCode({
      code: "",
      discount: 0,
      isValid: false,
      isApplied: false,
    });
    setPromoInput("");
    setPromoError("");
  }, []);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const handlePaymentChange = (field, value) => {
    setPaymentInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handlePromoCodeApply = () => {
    const upperCode = promoInput.toUpperCase();
    const discount = validPromoCodes[upperCode];

    if (discount) {
      setPromoCode({
        code: upperCode,
        discount,
        isValid: true,
        isApplied: true,
      });
      setPromoError("");
    } else {
      setPromoCode({
        code: "",
        discount: 0,
        isValid: false,
        isApplied: false,
      });
      setPromoError("Invalid promo code. Please try again.");
    }
  };

  const handlePromoCodeRemove = () => {
    setPromoCode({
      code: "",
      discount: 0,
      isValid: false,
      isApplied: false,
    });
    setPromoInput("");
    setPromoError("");
  };

  const calculatePricing = () => {
    const basePrice = sessionType === "private" ? 1200 : 800;
    const processingFee = sessionType === "private" ? 50 : 30;
    const subtotal = basePrice + processingFee;
    const discountAmount = promoCode.isApplied
      ? (basePrice * promoCode.discount) / 100
      : 0;
    const total = subtotal - discountAmount;

    return {
      basePrice,
      processingFee,
      subtotal,
      discountAmount,
      total,
    };
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return sessionType !== null;
      case 2:
        return selectedDate && selectedTime;
      case 3:
        return (
          paymentInfo.cardNumber &&
          paymentInfo.expiryDate &&
          paymentInfo.cvv &&
          paymentInfo.cardholderName
        );
      default:
        return true;
    }
  };

  const resetModal = () => {
    setCurrentStep(1);
    setSessionType(null);
    setSelectedDate("");
    setSelectedTime("");
    setVisibleSessions(5);
    setFilters({
      monthYear: "",
      timeZone: "",
      language: "",
      type: "",
    });
    setFilteredSessions(allSessions);
    setPaymentInfo({
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      cardholderName: "",
      billingAddress: "",
      city: "",
      zipCode: "",
      postalCode: "",
      country: "",
    });
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-[9999] p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b flex-shrink-0">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Book Your Session
            </h2>
            <p className="text-gray-600 mt-1">
              Complete Python Bootcamp From Zero to Hero
            </p>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="px-6 py-4 bg-gray-50 flex-shrink-0">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                    currentStep >= step.number
                      ? "bg-purple-600 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {currentStep > step.number ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    step.number
                  )}
                </div>
                <div className="ml-3">
                  <div className="text-sm font-medium text-gray-900">
                    {step.title}
                  </div>
                  <div className="text-xs text-gray-500">
                    {step.description}
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-16 h-0.5 mx-4 ${
                      currentStep > step.number
                        ? "bg-purple-600"
                        : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 min-h-0">
          <>
            {/* Step 1: Session Type Selection */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Choose Your Session Type
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Select the learning format that works best for you
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div
                    onClick={() => setSessionType("private")}
                    className={`p-6 border-2 rounded-xl cursor-pointer transition-all hover:shadow-md ${
                      sessionType === "private"
                        ? "border-purple-600 bg-purple-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-purple-600" />
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-semibold text-gray-900">
                          1-on-1 Private Session
                        </h4>
                        <p className="text-purple-600 font-medium">$1,200</p>
                      </div>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• 25 hours of instruction over 8 days</li>
                      <li>• Personalized learning experience</li>
                      <li>• Flexible scheduling</li>
                      <li>• Direct instructor attention</li>
                      <li>• Customized curriculum</li>
                    </ul>
                  </div>

                  <div
                    onClick={() => setSessionType("classroom")}
                    className={`p-6 border-2 rounded-xl cursor-pointer transition-all hover:shadow-md ${
                      sessionType === "classroom"
                        ? "border-purple-600 bg-purple-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <Users className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-semibold text-gray-900">
                          Classroom Session
                        </h4>
                        <p className="text-blue-600 font-medium">$800</p>
                      </div>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• 25 hours of instruction over 12 days</li>
                      <li>• Interactive group learning</li>
                      <li>• Peer collaboration</li>
                      <li>• Structured curriculum</li>
                      <li>• Cost-effective option</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Date and Time Selection */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Select Date & Time
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Choose your preferred{" "}
                    {sessionType === "private"
                      ? "1-on-1 session"
                      : "classroom session"}{" "}
                    schedule
                  </p>
                </div>

                {/* Filter Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6 main-filter-sec">
                  <select
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                    value={filters.monthYear}
                    onChange={(e) =>
                      handleFilterChange("monthYear", e.target.value)
                    }
                  >
                    <option>Select Month and Year</option>
                    <option value="January 2025">January 2025</option>
                    <option value="February 2025">February 2025</option>
                    <option value="March 2025">March 2025</option>
                  </select>

                  <select
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                    value={filters.timeZone}
                    onChange={(e) =>
                      handleFilterChange("timeZone", e.target.value)
                    }
                  >
                    <option value="">Time Zone</option>
                    <option value="America">America</option>
                    <option value="Europe">Europe</option>
                    <option value="Asia">Asia</option>
                    <option value="Australia">Australia</option>
                  </select>

                  <select
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                    value={filters.language}
                    onChange={(e) =>
                      handleFilterChange("language", e.target.value)
                    }
                  >
                    <option value="">Language</option>
                    <option value="English">English</option>
                    <option value="Japanese">Japanese</option>
                    <option value="Spanish">Spanish</option>
                  </select>

                  <select
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                    value={filters.type}
                    onChange={(e) => handleFilterChange("type", e.target.value)}
                  >
                    <option value="">Type</option>
                    <option value="Virtual">Virtual</option>
                    <option value="In-Person">In-Person</option>
                  </select>

                  <div className="flex gap-2">
                    <button
                      onClick={applyFilters}
                      className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      Apply Filters
                    </button>
                    {(filters.monthYear ||
                      filters.timeZone ||
                      filters.language ||
                      filters.type) && (
                      <button
                        onClick={clearFilters}
                        className="px-4 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                        title="Clear Filters"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </div>

                {/* Active Filters Display */}
                {(filters.monthYear ||
                  filters.timeZone ||
                  filters.language ||
                  filters.type) && (
                  <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-medium text-blue-800">
                        Active Filters:
                      </span>
                      {filters.monthYear && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                          {filters.monthYear}
                        </span>
                      )}
                      {filters.timeZone && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                          {filters.timeZone} timezone
                        </span>
                      )}
                      {filters.language && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                          {filters.language}
                        </span>
                      )}
                      {filters.type && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                          {filters.type}
                        </span>
                      )}
                      <span className="text-blue-600 text-xs">
                        ({filteredSessions.length} sessions found)
                      </span>
                    </div>
                  </div>
                )}

                {/* Sessions Table */}
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  {/* Table Header */}
                  <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                    <div className="flex items-center">
                      <div className="w-10"></div>{" "}
                      {/* Space for radio button */}
                      <div className="w-6 mr-4"></div>{" "}
                      {/* Space for info icon */}
                      <div className="grid grid-cols-6 gap-4 flex-1 text-sm font-medium text-gray-700 uppercase tracking-wide">
                        <div>DATE</div>
                        <div>TIME</div>
                        <div>LOCATION</div>
                        <div>LANGUAGE</div>
                        <div>SEATS LEFT</div>
                        <div>PRICE</div>
                      </div>
                    </div>
                  </div>

                  {/* Table Body */}
                  <div className="divide-y divide-gray-200">
                    {filteredSessions.length > 0 ? (
                      filteredSessions
                        .slice(0, visibleSessions)
                        .map((session) => (
                          <div
                            key={session.id}
                            className={`px-6 py-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                              selectedDate === session.dateRange &&
                              selectedTime === session.time
                                ? "bg-purple-50 border-l-4 border-purple-600"
                                : ""
                            }`}
                            onClick={() => {
                              setSelectedDate(session.dateRange);
                              setSelectedTime(session.time);
                            }}
                          >
                            <div className="flex items-center">
                              <input
                                type="radio"
                                name="session"
                                checked={
                                  selectedDate === session.dateRange &&
                                  selectedTime === session.time
                                }
                                onChange={() => {}}
                                readOnly
                                className="w-4 h-4 text-purple-600 mr-4"
                              />
                              <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center mr-4">
                                <span className="text-white text-xs font-bold">
                                  i
                                </span>
                              </div>
                              <div className="grid grid-cols-6 gap-4 flex-1 text-sm">
                                <div>
                                  <div className="font-medium text-gray-900">
                                    {session.dateRange}
                                  </div>
                                </div>
                                <div>
                                  <div className="text-gray-900">
                                    {session.time}
                                  </div>
                                  <div className="text-gray-500 text-xs">
                                    {session.timezone}
                                  </div>
                                </div>
                                <div className="text-gray-900">
                                  {session.location}
                                </div>
                                <div className="text-gray-900">
                                  {session.language}
                                </div>
                                <div>
                                  <div
                                    className={`font-medium ${
                                      session.seatsLeft === "Join Waitlist"
                                        ? "text-gray-600"
                                        : "text-gray-900"
                                    }`}
                                  >
                                    {session.seatsLeft}
                                  </div>
                                </div>
                                <div className="font-bold text-gray-900">
                                  {session.price}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                    ) : (
                      <div className="px-6 py-12 text-center">
                        <div className="text-gray-400 mb-2">
                          <Calendar className="w-12 h-12 mx-auto mb-3" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          No sessions found
                        </h3>
                        <p className="text-gray-600 mb-4">
                          No sessions match your current filter criteria. Try
                          adjusting your filters or clearing them to see all
                          available sessions.
                        </p>
                        <button
                          onClick={clearFilters}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Clear All Filters
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Load More Button */}
                  {visibleSessions < filteredSessions.length && (
                    <div className="bg-blue-600 text-center">
                      <button
                        onClick={handleLoadMore}
                        className="w-full py-4 text-white font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                        Load More Classes (
                        {filteredSessions.length - visibleSessions} remaining)
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 3: Payment Information */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <CreditCard className="w-6 h-6 mr-2" />
                    Payment Information
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Enter your payment details to complete the booking
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 card_details_grid">
                  <div className="space-y-4 main_input">
                    <div>
                      <label className="d-block text-sm font-medium text-gray-700 mb-2">
                        Card Number
                      </label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        value={paymentInfo.cardNumber}
                        onChange={(e) =>
                          handlePaymentChange("cardNumber", e.target.value)
                        }
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="d-block text-sm font-medium text-gray-700 mb-2">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          value={paymentInfo.expiryDate}
                          onChange={(e) =>
                            handlePaymentChange("expiryDate", e.target.value)
                          }
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="d-block text-sm font-medium text-gray-700 mb-2">
                          CVV
                        </label>
                        <input
                          type="text"
                          placeholder="123"
                          value={paymentInfo.cvv}
                          onChange={(e) =>
                            handlePaymentChange("cvv", e.target.value)
                          }
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="d-block text-sm font-medium text-gray-700 mb-2">
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        value={paymentInfo.cardholderName}
                        onChange={(e) =>
                          handlePaymentChange("cardholderName", e.target.value)
                        }
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="space-y-4 main_input">
                    <div>
                      <label className="d-block text-sm font-medium text-gray-700 mb-2">
                        Billing Address
                      </label>
                      <input
                        type="text"
                        placeholder="123 Main Street"
                        value={paymentInfo.billingAddress}
                        onChange={(e) =>
                          handlePaymentChange("billingAddress", e.target.value)
                        }
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="d-block text-sm font-medium text-gray-700 mb-2">
                          City
                        </label>
                        <input
                          type="text"
                          placeholder="New York"
                          value={paymentInfo.city}
                          onChange={(e) =>
                            handlePaymentChange("city", e.target.value)
                          }
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="d-block text-sm font-medium text-gray-700 mb-2">
                          ZIP Code
                        </label>
                        <input
                          type="text"
                          placeholder="10001"
                          value={paymentInfo.zipCode}
                          onChange={(e) =>
                            handlePaymentChange("zipCode", e.target.value)
                          }
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="d-block text-sm font-medium text-gray-700 mb-2">
                          Country
                        </label>
                        <select
                          value={paymentInfo.country}
                          onChange={(e) =>
                            handlePaymentChange("country", e.target.value)
                          }
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                        >
                          <option value="">Select Country</option>
                          <option value="US">United States</option>
                          <option value="CA">Canada</option>
                          <option value="GB">United Kingdom</option>
                          <option value="AU">Australia</option>
                          <option value="DE">Germany</option>
                          <option value="FR">France</option>
                          <option value="JP">Japan</option>
                          <option value="IN">India</option>
                          <option value="BR">Brazil</option>
                          <option value="MX">Mexico</option>
                          <option value="IT">Italy</option>
                          <option value="ES">Spain</option>
                          <option value="NL">Netherlands</option>
                          <option value="SE">Sweden</option>
                          <option value="NO">Norway</option>
                          <option value="DK">Denmark</option>
                          <option value="FI">Finland</option>
                          <option value="SG">Singapore</option>
                          <option value="HK">Hong Kong</option>
                          <option value="NZ">New Zealand</option>
                        </select>
                      </div>
                    </div>

                    {/* Promo Code Section */}
                    <div className="mb-6">
                      {!promoCode.isApplied ? (
                        <div>
                          <div className="flex main_promo_class">
                            <input
                              type="text"
                              placeholder="Apply Promo Code"
                              value={promoInput}
                              onChange={(e) => {
                                setPromoInput(e.target.value.toUpperCase());
                                setPromoError("");
                              }}
                              className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                            />
                            <button
                              onClick={handlePromoCodeApply}
                              disabled={!promoInput.trim()}
                              className={`px-8 py-3 rounded-r-lg font-medium transition-colors ${
                                promoInput.trim()
                                  ? "bg-gray-600 text-white hover:bg-gray-700"
                                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
                              }`}
                            >
                              Apply
                            </button>
                          </div>
                          {promoError && (
                            <p className="text-red-600 text-sm mt-2">
                              {promoError}
                            </p>
                          )}
                        </div>
                      ) : (
                        <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg px-4 py-3">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span className="font-medium text-green-800">
                              {promoCode.code} applied ({promoCode.discount}%
                              off)
                            </span>
                          </div>
                          <button
                            onClick={handlePromoCodeRemove}
                            className="text-green-600 hover:text-green-800 font-medium"
                          >
                            Remove
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2">
                        Order Summary
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between text-gray-600">
                          <span>
                            {sessionType === "private"
                              ? "1-on-1 Private Session"
                              : "Classroom Session"}
                          </span>
                          <span>
                            ${calculatePricing().basePrice.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                          <span>Processing Fee</span>
                          <span>${calculatePricing().processingFee}</span>
                        </div>
                        {promoCode.isApplied && (
                          <div className="flex justify-between text-green-600">
                            <span>Discount ({promoCode.code})</span>
                            <span>
                              -${calculatePricing().discountAmount.toFixed(0)}
                            </span>
                          </div>
                        )}
                        <div className="border-t pt-2">
                          <div className="flex justify-between font-medium text-gray-900">
                            <span>Total</span>
                            <span className="text-purple-600">
                              ${calculatePricing().total.toFixed(0)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Review */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Review Your Booking
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Please review your booking details before confirming
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-4">
                        Session Details
                      </h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Course:</span>
                          <span className="font-medium">
                            Complete Python Bootcamp
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Session Type:</span>
                          <span className="font-medium">
                            {sessionType === "private"
                              ? "1-on-1 Private Session"
                              : "Classroom Session"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Date:</span>
                          <span className="font-medium">{selectedDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Time:</span>
                          <span className="font-medium">{selectedTime}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Location:</span>
                          <span className="font-medium">
                            {filteredSessions.find(
                              (session) =>
                                session.dateRange === selectedDate &&
                                session.time === selectedTime
                            )?.location || "Virtual"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Language:</span>
                          <span className="font-medium">
                            {filteredSessions.find(
                              (session) =>
                                session.dateRange === selectedDate &&
                                session.time === selectedTime
                            )?.language || "English"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Timezone:</span>
                          <span className="font-medium">
                            {filteredSessions.find(
                              (session) =>
                                session.dateRange === selectedDate &&
                                session.time === selectedTime
                            )?.timezone || "UTC"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Instructor:</span>
                          <span className="font-medium">Jenny Wilson</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-4">
                        Payment Summary
                      </h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Session Fee:</span>
                          <span className="font-medium">
                            ${sessionType === "private" ? "1,200" : "800"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Processing Fee:</span>
                          <span className="font-medium">
                            ${sessionType === "private" ? "50" : "30"}
                          </span>
                        </div>
                        <div className="border-t pt-3">
                          <div className="flex justify-between text-lg font-semibold">
                            <span>Total:</span>
                            <span className="text-purple-600">
                              ${sessionType === "private" ? "1,250" : "830"}
                            </span>
                          </div>
                        </div>
                        <div className="text-sm text-gray-600 mt-4">
                          <p>
                            Payment Method: •••• •••• ••••{" "}
                            {paymentInfo.cardNumber.slice(-4)}
                          </p>
                          <p>Cardholder: {paymentInfo.cardholderName}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 mr-3" />
                    <div className="text-sm text-blue-800">
                      <p className="font-medium mb-1">Booking Confirmation</p>
                      <p>
                        You will receive a confirmation email with session
                        details and joining instructions within 5 minutes of
                        completing this booking.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t bg-gray-50 flex-shrink-0">
          <button
            onClick={currentStep === 1 ? handleClose : handleBack}
            className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            {currentStep === 1 ? "Cancel" : "Back"}
          </button>

          <button
            onClick={currentStep === 4 ? handleClose : handleNext}
            disabled={!canProceed()}
            className={`px-8 py-3 rounded-lg font-medium transition-colors ${
              canProceed()
                ? "bg-purple-600 text-white hover:bg-purple-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {currentStep === 4 ? "Confirm Booking" : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
