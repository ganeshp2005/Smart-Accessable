import React, { useState, useEffect, useRef } from 'react';
import { 
  MapPin, 
  Navigation, 
  Search, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  ExternalLink,
  Car,
  Footprints,
  Train,
  Bike,
  Sparkles,
  Phone,
  Layers,
  Compass,
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  ArrowUpRight,
  ArrowUpLeft,
  CornerUpRight,
  CornerUpLeft,
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  Share2,
  QrCode,
  Flame,
  Leaf,
  SlidersHorizontal,
  ChevronRight,
  Check
} from 'lucide-react';
import { useOne } from '../context/OneContext';

const DEFAULT_LOCATIONS = [
  {
    id: "loc-1",
    name: "Amazon Hub Locker+ — Central Metro",
    type: "Locker+",
    address: "450 7th Ave, New York, NY 10001",
    coords: { x: 420, y: 160 },
    distance: "0.4 miles away",
    hours: "Open 24/7 • Touchless Pickup & Instant Returns",
    services: ["Self-service touchless pickup", "Instant boxless QR returns", "Customer service desk", "Free packing tape"],
    phone: "(888) 280-4331",
    availableLockers: { small: 14, medium: 8, large: 3 },
    routes: {
      driving: {
        time: "4 mins",
        distance: "0.4 mi",
        summary: "via 7th Ave • Fastest route now, normal traffic",
        traffic: "Fast • 1 light delay",
        carbon: "110g CO₂",
        steps: [
          { icon: "straight", maneuver: "Head north on 7th Ave toward W 34th St", dist: "0.1 mi", time: "1 min", street: "7th Ave" },
          { icon: "turn-right", maneuver: "Turn right onto W 34th St past Penn Station", dist: "0.2 mi", time: "2 mins", street: "W 34th St" },
          { icon: "slight-right", maneuver: "Keep right onto Broadway / 7th Ave junction", dist: "0.1 mi", time: "1 min", street: "Broadway" },
          { icon: "arrive", maneuver: "Arrive at 450 7th Ave. Amazon Hub Locker+ is on the right.", dist: "Destination", time: "Arrived", street: "Locker+ Entrance" }
        ]
      },
      walking: {
        time: "8 mins",
        distance: "0.4 mi",
        summary: "via W 34th St Pedestrian Plaza • Flat terrain",
        traffic: "Pedestrian clear • 840 steps",
        calories: "32 kcal",
        steps: [
          { icon: "straight", maneuver: "Walk north on 7th Ave sidewalk past Penn Station entrance", dist: "350 ft", time: "2 mins", street: "7th Ave Sidewalk" },
          { icon: "turn-right", maneuver: "Cross W 34th St at signaled crosswalk into pedestrian plaza", dist: "0.2 mi", time: "4 mins", street: "Herald Sq Plaza" },
          { icon: "straight", maneuver: "Continue past Macy's Herald Square toward Broadway entrance", dist: "400 ft", time: "2 mins", street: "W 34th St" },
          { icon: "arrive", maneuver: "Arrive at 450 7th Ave. Locker kiosk is inside ground lobby.", dist: "Destination", time: "Arrived", street: "Lobby Kiosk" }
        ]
      },
      transit: {
        time: "3 mins",
        distance: "0.5 mi",
        summary: "Subway 1, 2, 3 to 34 St-Penn Station • Departs every 2 mins",
        traffic: "$2.90 fare • 1 Stop",
        line: "Subway 1 / 2 / 3 Line",
        steps: [
          { icon: "walking", maneuver: "Walk to 34 St - Penn Station 7th Ave entrance", dist: "150 ft", time: "1 min", street: "Station Entrance" },
          { icon: "train", maneuver: "Board Uptown 1 or 2 Local Train (Platform 1)", dist: "1 stop", time: "1 min", street: "MTA Subway 1/2" },
          { icon: "walking", maneuver: "Exit turnstiles to street level at W 34th St & 7th Ave", dist: "200 ft", time: "1 min", street: "North Concourse Exit" },
          { icon: "arrive", maneuver: "Enter building lobby at 450 7th Ave for Amazon Locker+", dist: "Destination", time: "Arrived", street: "Amazon Hub Hub" }
        ]
      },
      bicycling: {
        time: "3 mins",
        distance: "0.4 mi",
        summary: "via Broadway Protected Bike Lane • Mostly flat (+4 ft)",
        traffic: "Designated cycling lane • Citi Bike station nearby",
        calories: "18 kcal",
        steps: [
          { icon: "straight", maneuver: "Head north on 7th Ave protected green bike lane", dist: "0.1 mi", time: "1 min", street: "7th Ave Bike Lane" },
          { icon: "turn-right", maneuver: "Turn right onto W 34th St shared cycling corridor", dist: "0.2 mi", time: "1 min", street: "W 34th St" },
          { icon: "slight-right", maneuver: "Merge onto Broadway pedestrian-friendly cycle path", dist: "0.1 mi", time: "1 min", street: "Broadway Bike Path" },
          { icon: "arrive", maneuver: "Arrive at bike docking rack outside 450 7th Ave.", dist: "Destination", time: "Arrived", street: "Citi Bike Dock" }
        ]
      }
    }
  },
  {
    id: "loc-2",
    name: "Amazon Fresh Grocery Store — Midtown 34th",
    type: "Fresh Store",
    address: "238 W 34th St, New York, NY 10001",
    coords: { x: 320, y: 190 },
    distance: "0.8 miles away",
    hours: "Open Daily: 7:00 AM – 10:00 PM • Just Walk Out Shopping",
    services: ["Just Walk Out / Dash Cart shopping", "Free return drop-off without box", "Hot food buffet & sushi counter", "Prime 10% grocery discount"],
    phone: "(888) 280-4331",
    availableLockers: { small: 22, medium: 15, large: 8 },
    routes: {
      driving: {
        time: "6 mins",
        distance: "0.8 mi",
        summary: "via 8th Ave & W 34th St • Moderate traffic near MSG",
        traffic: "Moderate • 2 traffic signals",
        carbon: "220g CO₂",
        steps: [
          { icon: "straight", maneuver: "Head north on 8th Ave toward W 33rd St", dist: "0.3 mi", time: "2 mins", street: "8th Ave" },
          { icon: "turn-right", maneuver: "Turn right onto W 34th St past Madison Square Garden", dist: "0.4 mi", time: "3 mins", street: "W 34th St" },
          { icon: "straight", maneuver: "Continue straight past 7th Ave intersection", dist: "0.1 mi", time: "1 min", street: "W 34th St" },
          { icon: "arrive", maneuver: "Arrive at 238 W 34th St. Amazon Fresh entrance on the left with dedicated parking garage.", dist: "Destination", time: "Arrived", street: "Amazon Fresh Entrance" }
        ]
      },
      walking: {
        time: "14 mins",
        distance: "0.8 mi",
        summary: "via 7th Ave & W 34th St • Wide pedestrian sidewalks",
        traffic: "Pedestrian friendly • 1,620 steps",
        calories: "64 kcal",
        steps: [
          { icon: "straight", maneuver: "Head west on W 31st St toward 8th Ave", dist: "0.2 mi", time: "3 mins", street: "W 31st St" },
          { icon: "turn-right", maneuver: "Turn right onto 8th Ave alongside Madison Square Garden", dist: "0.3 mi", time: "5 mins", street: "8th Ave Sidewalk" },
          { icon: "turn-right", maneuver: "Turn right onto W 34th St at Moynihan Train Hall corner", dist: "0.3 mi", time: "5 mins", street: "W 34th St Sidewalk" },
          { icon: "arrive", maneuver: "Arrive at Amazon Fresh (238 W 34th St). Tap Amazon app or payment card to enter.", dist: "Destination", time: "Arrived", street: "Dash Cart Turnstile" }
        ]
      },
      transit: {
        time: "5 mins",
        distance: "0.8 mi",
        summary: "A, C, E Subway to 34 St-Penn Station (8th Ave concourse)",
        traffic: "$2.90 fare • 1 Stop direct",
        line: "Subway A / C / E Line",
        steps: [
          { icon: "walking", maneuver: "Enter 34 St - Penn Station 8th Ave Concourse", dist: "200 ft", time: "1 min", street: "Moynihan Concourse" },
          { icon: "train", maneuver: "Board Uptown C Train to 34 St - Penn Station", dist: "1 stop", time: "2 mins", street: "MTA Subway C" },
          { icon: "walking", maneuver: "Exit directly up to W 34th St north exit", dist: "180 ft", time: "1 min", street: "Station Stairwell" },
          { icon: "arrive", maneuver: "Walk 100 ft east to Amazon Fresh entrance.", dist: "Destination", time: "Arrived", street: "Amazon Fresh" }
        ]
      },
      bicycling: {
        time: "5 mins",
        distance: "0.8 mi",
        summary: "via 8th Ave Protected Bike Lane",
        traffic: "Dedicated bike path • Citi Bike racks available",
        calories: "35 kcal",
        steps: [
          { icon: "straight", maneuver: "Head north on 8th Ave protected bicycle corridor", dist: "0.4 mi", time: "2 mins", street: "8th Ave Bike Path" },
          { icon: "turn-right", maneuver: "Turn right onto W 34th St cross-town bike route", dist: "0.4 mi", time: "2 mins", street: "W 34th St" },
          { icon: "arrive", maneuver: "Arrive at 238 W 34th St. Lock bike at front rack.", dist: "Destination", time: "Arrived", street: "Storefront" }
        ]
      }
    }
  },
  {
    id: "loc-3",
    name: "Whole Foods Market (Amazon Returns & Grocery)",
    type: "Whole Foods",
    address: "250 7th Ave, New York, NY 10001",
    coords: { x: 420, y: 350 },
    distance: "1.2 miles away",
    hours: "Open Daily: 8:00 AM – 9:00 PM • Full Return Counter",
    services: ["Prime exclusive 10% discount", "Amazon return counter (no box needed)", "Organic grocery selection", "Hot bar & salad bar"],
    phone: "(212) 924-5969",
    availableLockers: { small: 30, medium: 20, large: 10 },
    routes: {
      driving: {
        time: "8 mins",
        distance: "1.2 mi",
        summary: "via 7th Ave Southbound to Chelsea",
        traffic: "Smooth flow • Chelsea traffic light corridor",
        carbon: "320g CO₂",
        steps: [
          { icon: "straight", maneuver: "Travel south along 7th Avenue toward Chelsea district", dist: "0.7 mi", time: "4 mins", street: "7th Ave South" },
          { icon: "straight", maneuver: "Continue straight across W 25th Street intersection", dist: "0.3 mi", time: "2 mins", street: "7th Ave" },
          { icon: "slight-right", maneuver: "Prepare to pull into parking lane near W 24th St", dist: "0.2 mi", time: "1 min", street: "7th Ave / 24th" },
          { icon: "arrive", maneuver: "Whole Foods Market will be on your right at 250 7th Ave.", dist: "Destination", time: "Arrived", street: "Whole Foods Entrance" }
        ]
      },
      walking: {
        time: "22 mins",
        distance: "1.2 mi",
        summary: "Scenic walk down 7th Ave through Chelsea Art district",
        traffic: "Wide sidewalks • 2,450 steps",
        calories: "98 kcal",
        steps: [
          { icon: "straight", maneuver: "Walk south down 7th Ave past Fashion Institute of Technology", dist: "0.5 mi", time: "9 mins", street: "7th Ave" },
          { icon: "straight", maneuver: "Continue straight past Chelsea floral district", dist: "0.4 mi", time: "8 mins", street: "7th Ave & 26th" },
          { icon: "straight", maneuver: "Cross W 25th Street at pedestrian crosswalk", dist: "0.2 mi", time: "4 mins", street: "7th Ave & 25th" },
          { icon: "arrive", maneuver: "Arrive at 250 7th Ave. Amazon return desk is located at Customer Service.", dist: "Destination", time: "Arrived", street: "Customer Service Desk" }
        ]
      },
      transit: {
        time: "6 mins",
        distance: "1.2 mi",
        summary: "Subway 1 Train Downtown to 23rd St Station",
        traffic: "$2.90 fare • 2 stops • Departs every 3 mins",
        line: "Subway 1 Local (Downtown)",
        steps: [
          { icon: "walking", maneuver: "Enter 28th St / 34th St subway entrance", dist: "250 ft", time: "1 min", street: "Subway Stairwell" },
          { icon: "train", maneuver: "Board Downtown 1 Train toward South Ferry", dist: "2 stops", time: "3 mins", street: "MTA Subway 1" },
          { icon: "walking", maneuver: "Exit at 23rd St Station onto 7th Ave northwest corner", dist: "150 ft", time: "1 min", street: "23 St Exit" },
          { icon: "arrive", maneuver: "Walk half a block north to 250 7th Ave Whole Foods.", dist: "Destination", time: "Arrived", street: "Storefront" }
        ]
      },
      bicycling: {
        time: "7 mins",
        distance: "1.2 mi",
        summary: "via 7th Ave Southbound Protected Bike Lane",
        traffic: "Dedicated bike lane all the way to Chelsea",
        calories: "45 kcal",
        steps: [
          { icon: "straight", maneuver: "Head south on 7th Ave designated bicycle lane", dist: "0.9 mi", time: "5 mins", street: "7th Ave Bike Lane" },
          { icon: "straight", maneuver: "Coast past W 26th St with bicycle traffic signal", dist: "0.2 mi", time: "1 min", street: "7th Ave" },
          { icon: "arrive", maneuver: "Arrive at Whole Foods. Citi Bike station right in front.", dist: "Destination", time: "Arrived", street: "Citi Bike 7th & 24th" }
        ]
      }
    }
  },
  {
    id: "loc-4",
    name: "Amazon Hub Locker — Port Authority Transit",
    type: "Locker",
    address: "625 8th Ave, New York, NY 10018",
    coords: { x: 320, y: 90 },
    distance: "1.5 miles away",
    hours: "Open 24/7 (Transit Hall Concourse) • Kiosk Name: Sparrow",
    services: ["Self-service package pickup", "Barcode return drop-off", "Wheelchair accessible", "Direct indoor subway link"],
    phone: "(888) 280-4331",
    availableLockers: { small: 18, medium: 9, large: 0 },
    routes: {
      driving: {
        time: "9 mins",
        distance: "1.5 mi",
        summary: "via 8th Ave Northbound • Port Authority bus lane caution",
        traffic: "Heavy bus transit zone",
        carbon: "380g CO₂",
        steps: [
          { icon: "straight", maneuver: "Head north on 8th Ave toward 40th St", dist: "0.8 mi", time: "5 mins", street: "8th Ave" },
          { icon: "straight", maneuver: "Pass Times Square cross-streets keeping in right general lanes", dist: "0.4 mi", time: "2 mins", street: "8th Ave" },
          { icon: "turn-right", maneuver: "Turn right onto W 42nd St toward passenger drop-off", dist: "0.2 mi", time: "1 min", street: "W 42nd St" },
          { icon: "arrive", maneuver: "Enter Port Authority main concourse north wing. Kiosk 'Sparrow' near ticket booths.", dist: "Destination", time: "Arrived", street: "North Concourse" }
        ]
      },
      walking: {
        time: "25 mins",
        distance: "1.5 mi",
        summary: "via 8th Ave past Times Square Theater District",
        traffic: "High foot traffic • 2,900 steps",
        calories: "115 kcal",
        steps: [
          { icon: "straight", maneuver: "Walk north on 8th Ave sidewalk toward 38th St", dist: "0.6 mi", time: "10 mins", street: "8th Ave" },
          { icon: "straight", maneuver: "Continue north past NY Times Building (W 40th St)", dist: "0.4 mi", time: "8 mins", street: "8th Ave & 40th" },
          { icon: "turn-left", maneuver: "Turn left into Port Authority Bus Terminal 8th Ave entrance", dist: "0.1 mi", time: "2 mins", street: "Terminal Entrance" },
          { icon: "arrive", maneuver: "Locker kiosk 'Sparrow' is located on Lower Level 1 next to ticket gates.", dist: "Destination", time: "Arrived", street: "Kiosk Sparrow" }
        ]
      },
      transit: {
        time: "4 mins",
        distance: "1.5 mi",
        summary: "A, C, E Subway Northbound to 42 St - Port Authority Bus Terminal",
        traffic: "$2.90 fare • 1 Stop express • Direct underground tunnel",
        line: "Subway A / C Express",
        steps: [
          { icon: "walking", maneuver: "Enter 34 St-Penn Station subway concourse", dist: "200 ft", time: "1 min", street: "Subway Gate" },
          { icon: "train", maneuver: "Board Uptown A or C Train to 42 St-Port Authority", dist: "1 stop", time: "2 mins", street: "MTA Subway A" },
          { icon: "walking", maneuver: "Exit train and follow overhead yellow signs for 'Bus Terminal / Lockers'", dist: "150 ft", time: "1 min", street: "Underground Passage" },
          { icon: "arrive", maneuver: "Arrive at Amazon Locker kiosk 'Sparrow' next to Greyhound customer desk.", dist: "Destination", time: "Arrived", street: "Locker Area" }
        ]
      },
      bicycling: {
        time: "8 mins",
        distance: "1.5 mi",
        summary: "via 8th Ave Protected Bike Lane Northbound",
        traffic: "Smooth cycling corridor with bike signal lights",
        calories: "55 kcal",
        steps: [
          { icon: "straight", maneuver: "Head north on 8th Ave dedicated bike lane toward 40th St", dist: "1.0 mi", time: "5 mins", street: "8th Ave Bike Lane" },
          { icon: "turn-left", maneuver: "Turn left onto W 41st St toward Port Authority bike racks", dist: "0.2 mi", time: "2 mins", street: "W 41st St" },
          { icon: "arrive", maneuver: "Park bike and enter Port Authority Terminal via 41st St portal.", dist: "Destination", time: "Arrived", street: "Terminal Portal" }
        ]
      }
    }
  }
];

export default function OneMaps() {
  const { showToast } = useOne();
  const [locations, setLocations] = useState(DEFAULT_LOCATIONS);
  const [selectedLocation, setSelectedLocation] = useState(DEFAULT_LOCATIONS[0]);
  const [activeMode, setActiveMode] = useState('all'); // 'all', 'driving', 'walking', 'transit', 'bicycling'
  const [filterType, setFilterType] = useState('All');
  const [userCustomSearch, setUserCustomSearch] = useState('');
  const [userOrigin, setUserOrigin] = useState('Current Location (Penn Station, NY)');
  
  // Navigation Simulation State
  const [isNavigating, setIsNavigating] = useState(false);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [navSpeed, setNavSpeed] = useState(24); // mph
  const [voicePrompt, setVoicePrompt] = useState('');
  const [mapLayer, setMapLayer] = useState('vector'); // 'vector', 'google', 'satellite'
  const [showQrModal, setShowQrModal] = useState(false);
  const [qrType, setQrType] = useState('pickup'); // 'pickup', 'return'
  const [selectedLockerSize, setSelectedLockerSize] = useState('medium');

  // Filter locations
  const filteredLocations = locations.filter(loc => {
    return filterType === 'All' || loc.type.toLowerCase().includes(filterType.toLowerCase());
  });

  const activeRouteObj = selectedLocation.routes?.[activeMode === 'all' ? 'driving' : activeMode] || selectedLocation.routes?.driving;
  const currentStep = activeRouteObj?.steps?.[activeStepIndex] || activeRouteObj?.steps?.[0];

  // Helper for voice synthesis turn announcements
  const announceTurn = (text) => {
    setVoicePrompt(text);
    if (!isMuted && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.05;
        utterance.pitch = 1.0;
        window.speechSynthesis.speak(utterance);
      } catch {
        // Voice synthesis fallback
      }
    }
  };

  // Step-by-step navigation auto-progression simulator
  useEffect(() => {
    let timer;
    if (isNavigating && activeRouteObj?.steps) {
      const stepText = activeRouteObj.steps[activeStepIndex]?.maneuver || "Continue on route";
      announceTurn(stepText);

      timer = setInterval(() => {
        setActiveStepIndex(prev => {
          if (prev < activeRouteObj.steps.length - 1) {
            const nextIdx = prev + 1;
            announceTurn(activeRouteObj.steps[nextIdx].maneuver);
            return nextIdx;
          } else {
            setIsNavigating(false);
            showToast("You have arrived at your Amazon destination!", "success");
            announceTurn(`You have arrived at ${selectedLocation.name}`);
            return 0;
          }
        });
      }, 5000);
    }
    return () => clearInterval(timer);
  }, [isNavigating, activeStepIndex, activeMode, selectedLocation]);

  const startNavigation = (mode) => {
    if (mode && mode !== 'all') {
      setActiveMode(mode);
    }
    setActiveStepIndex(0);
    setIsNavigating(true);
    showToast(`Started GPS Route Navigation for ${selectedLocation.name}`, "success");
  };

  const stopNavigation = () => {
    setIsNavigating(false);
    setActiveStepIndex(0);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    showToast("Route navigation stopped", "info");
  };

  const handleCustomMapSearch = (e) => {
    e.preventDefault();
    if (!userCustomSearch.trim()) return;

    const query = userCustomSearch.trim();
    const newLoc = {
      id: `custom-${Date.now()}`,
      name: `Destination: "${query}"`,
      type: "Custom Location",
      address: query,
      coords: { x: 380, y: 220 },
      distance: "Calculated from Origin",
      hours: "Location via Google Directions API",
      services: ["Turn-by-turn navigation", "Live Traffic Estimates", "All Mode Comparison"],
      phone: "N/A",
      availableLockers: { small: 10, medium: 5, large: 2 },
      routes: {
        driving: {
          time: "7 mins",
          distance: "1.1 mi",
          summary: `Fastest vehicular route to ${query}`,
          traffic: "Normal traffic flow",
          carbon: "260g CO₂",
          steps: [
            { icon: "straight", maneuver: `Start from ${userOrigin} heading toward destination`, dist: "0.2 mi", time: "1 min", street: "Starting Route" },
            { icon: "turn-right", maneuver: `Turn right onto main thoroughfare toward ${query}`, dist: "0.6 mi", time: "4 mins", street: "Main Avenue" },
            { icon: "arrive", maneuver: `Arrive at destination: ${query}`, dist: "Destination", time: "Arrived", street: query }
          ]
        },
        walking: {
          time: "18 mins",
          distance: "1.0 mi",
          summary: `Direct pedestrian sidewalk route to ${query}`,
          traffic: "Pedestrian walkways • 2,100 steps",
          calories: "78 kcal",
          steps: [
            { icon: "straight", maneuver: `Walk along pedestrian path from ${userOrigin}`, dist: "0.3 mi", time: "5 mins", street: "Sidewalk" },
            { icon: "turn-left", maneuver: `Cross at intersection and proceed toward ${query}`, dist: "0.7 mi", time: "13 mins", street: "Pedestrian Crosswalk" },
            { icon: "arrive", maneuver: `Arrive at ${query}`, dist: "Destination", time: "Arrived", street: query }
          ]
        },
        transit: {
          time: "9 mins",
          distance: "1.2 mi",
          summary: `Direct bus / subway connection to ${query}`,
          traffic: "$2.90 fare • Connects to destination",
          line: "Metro Transit Route",
          steps: [
            { icon: "walking", maneuver: "Walk to nearest transit station", dist: "300 ft", time: "2 mins", street: "Station Platform" },
            { icon: "train", maneuver: `Board transit line toward ${query} stop`, dist: "2 stops", time: "5 mins", street: "Transit Rail" },
            { icon: "arrive", maneuver: `Arrive at stop near ${query}`, dist: "Destination", time: "Arrived", street: query }
          ]
        },
        bicycling: {
          time: "6 mins",
          distance: "1.1 mi",
          summary: `Designated bike corridors toward ${query}`,
          traffic: "Bike friendly paths",
          calories: "40 kcal",
          steps: [
            { icon: "straight", maneuver: "Join designated cycle path", dist: "0.5 mi", time: "3 mins", street: "Bike Path" },
            { icon: "turn-right", maneuver: `Follow green bike lane toward ${query}`, dist: "0.6 mi", time: "3 mins", street: "Cycle Track" },
            { icon: "arrive", maneuver: `Arrive at ${query}`, dist: "Destination", time: "Arrived", street: query }
          ]
        }
      }
    };

    setLocations(prev => [newLoc, ...prev]);
    setSelectedLocation(newLoc);
    showToast(`Loaded map and complete directions for "${query}"`, "success");
    setUserCustomSearch('');
  };

  // Google Maps Embed URL with directions parameters
  const dirFlag = activeMode === 'walking' ? 'w' : activeMode === 'transit' ? 'r' : activeMode === 'bicycling' ? 'b' : 'd';
  const mapEmbedUrl = `https://maps.google.com/maps?saddr=${encodeURIComponent(userOrigin)}&daddr=${encodeURIComponent(selectedLocation.address)}&dirflg=${dirFlag}&t=&z=14&ie=UTF8&iwloc=&output=embed`;
  
  // Direct Google Maps External URL
  const travelParam = activeMode === 'walking' ? 'walking' : activeMode === 'transit' ? 'transit' : activeMode === 'bicycling' ? 'bicycling' : 'driving';
  const directMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(userOrigin)}&destination=${encodeURIComponent(selectedLocation.address)}&travelmode=${travelParam}`;
  const appleMapsUrl = `https://maps.apple.com/?saddr=${encodeURIComponent(userOrigin)}&daddr=${encodeURIComponent(selectedLocation.address)}`;
  const wazeUrl = `https://waze.com/ul?q=${encodeURIComponent(selectedLocation.address)}&navigate=yes`;

  // Helper for rendering turn icons
  const renderTurnIcon = (iconName, size = 18) => {
    switch (iconName) {
      case 'straight': return <ArrowUp size={size} />;
      case 'turn-left': return <CornerUpLeft size={size} />;
      case 'turn-right': return <CornerUpRight size={size} />;
      case 'slight-left': return <ArrowUpLeft size={size} />;
      case 'slight-right': return <ArrowUpRight size={size} />;
      case 'train': return <Train size={size} />;
      case 'walking': return <Footprints size={size} />;
      case 'arrive': return <MapPin size={size} className="text-amber-500" />;
      default: return <ArrowUp size={size} />;
    }
  };

  return (
    <div className="maps-immersive-root">
      {/* Top GPS Navigation Command Header */}
      <div className="maps-cmd-banner card-base">
        <div className="cmd-banner-left">
          <div className="cmd-badge">
            <Navigation size={14} className="text-emerald-400" />
            <span>Amazon Maps & Turn-by-Turn Route Intelligence</span>
          </div>
          <h1 className="cmd-title">Amazon Hub, Fresh & Locker Directions</h1>
          <p className="cmd-subtitle">
            Complete navigation directions across all modes: <strong>Driving, Walking, Transit & Bicycling</strong> with live turn maneuvers, distance metrics, and touchless locker pickup passes.
          </p>
        </div>

        <div className="cmd-banner-actions">
          <button 
            type="button" 
            onClick={() => { setQrType('pickup'); setShowQrModal(true); }}
            className="btn-primary"
            style={{ padding: '0.75rem 1.25rem', background: '#f59e0b', color: '#0f172a', fontWeight: 700 }}
          >
            <QrCode size={18} />
            <span>Locker Pickup Pass</span>
          </button>

          <a
            href={directMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-navy"
            style={{ padding: '0.75rem 1.25rem' }}
          >
            <ExternalLink size={16} />
            <span>Open in Google Maps</span>
          </a>
        </div>
      </div>

      {/* Live Route Planner & Address Origin Bar */}
      <div className="route-inputs-card card-base">
        <div className="route-fields-row">
          <div className="input-group-origin">
            <div className="point-indicator point-a">A</div>
            <div className="field-inner">
              <label>Starting Point / Origin:</label>
              <input
                type="text"
                value={userOrigin}
                onChange={(e) => setUserOrigin(e.target.value)}
                placeholder="Enter origin (e.g. Penn Station, JFK, Times Square)..."
                className="geo-input"
              />
            </div>
          </div>

          <div className="input-group-dest">
            <div className="point-indicator point-b">B</div>
            <div className="field-inner">
              <label>Target Destination:</label>
              <div className="dest-display">
                <strong>{selectedLocation.name}</strong>
                <span>{selectedLocation.address}</span>
              </div>
            </div>
          </div>

          {/* Quick Custom Search Input */}
          <form onSubmit={handleCustomMapSearch} className="search-box-form">
            <input
              type="text"
              value={userCustomSearch}
              onChange={(e) => setUserCustomSearch(e.target.value)}
              placeholder="Search custom Amazon locker or store..."
              className="geo-input search-input"
            />
            <button type="submit" className="search-btn">
              <Search size={16} />
              <span>Route</span>
            </button>
          </form>
        </div>

        {/* Travel Mode Switcher: ALL vs DRIVING vs WALKING vs TRANSIT vs BICYCLING */}
        <div className="mode-selection-bar">
          <span className="mode-prompt"><Compass size={16} /> Select Directions Mode:</span>
          <div className="mode-pills-row">
            <button
              type="button"
              onClick={() => { setActiveMode('all'); showToast("Displaying all 4 direction modes at a glance", "info"); }}
              className={`mode-tab ${activeMode === 'all' ? 'active-all' : ''}`}
            >
              <Layers size={16} />
              <span>All Directions (Overview)</span>
            </button>

            <button
              type="button"
              onClick={() => { setActiveMode('driving'); showToast("Switched to Driving Directions", "info"); }}
              className={`mode-tab ${activeMode === 'driving' ? 'active-driving' : ''}`}
            >
              <Car size={16} />
              <span>Driving: <strong>{selectedLocation.routes?.driving?.time || '4m'}</strong></span>
            </button>

            <button
              type="button"
              onClick={() => { setActiveMode('walking'); showToast("Switched to Walking Directions", "info"); }}
              className={`mode-tab ${activeMode === 'walking' ? 'active-walking' : ''}`}
            >
              <Footprints size={16} />
              <span>Walking: <strong>{selectedLocation.routes?.walking?.time || '8m'}</strong></span>
            </button>

            <button
              type="button"
              onClick={() => { setActiveMode('transit'); showToast("Switched to Transit Directions", "info"); }}
              className={`mode-tab ${activeMode === 'transit' ? 'active-transit' : ''}`}
            >
              <Train size={16} />
              <span>Transit: <strong>{selectedLocation.routes?.transit?.time || '3m'}</strong></span>
            </button>

            <button
              type="button"
              onClick={() => { setActiveMode('bicycling'); showToast("Switched to Bicycling Directions", "info"); }}
              className={`mode-tab ${activeMode === 'bicycling' ? 'active-bicycling' : ''}`}
            >
              <Bike size={16} />
              <span>Bicycling: <strong>{selectedLocation.routes?.bicycling?.time || '3m'}</strong></span>
            </button>
          </div>
        </div>
      </div>

      {/* LIVE NAVIGATION ACTIVE HUD (When simulated GPS is running) */}
      {isNavigating && (
        <div className="active-gps-hud card-base">
          <div className="gps-live-badge">
            <span className="pulse-dot"></span>
            <strong>LIVE GPS NAVIGATION ACTIVE</strong>
          </div>

          <div className="gps-turn-display">
            <div className="turn-direction-icon">
              {renderTurnIcon(currentStep?.icon, 36)}
            </div>
            <div className="turn-instruction-col">
              <span className="turn-dist-countdown">In {currentStep?.dist}</span>
              <h2 className="turn-primary-instruction">{currentStep?.maneuver}</h2>
              <span className="turn-street-tag">{currentStep?.street}</span>
            </div>
          </div>

          <div className="gps-telemetry-col">
            <div className="speedometer-box">
              <span className="speed-val">{activeMode === 'walking' ? '3.2' : activeMode === 'bicycling' ? '12' : navSpeed}</span>
              <span className="speed-unit">MPH</span>
            </div>

            <div className="gps-controls-row">
              <button 
                type="button" 
                onClick={() => setIsMuted(!isMuted)} 
                className="gps-btn-icon" 
                title={isMuted ? "Unmute Voice Guidance" : "Mute Voice Guidance"}
              >
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} className="text-emerald-400" />}
              </button>
              <button 
                type="button" 
                onClick={stopNavigation} 
                className="gps-btn-stop"
              >
                End Navigation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MAIN LAYOUT: Locations Sidebar + Maps & Directions Engine */}
      <div className="maps-content-grid">
        {/* Left Column: Filterable List of Amazon Locations */}
        <div className="locations-sidebar-col">
          <div className="locations-box card-base">
            <div className="loc-box-header">
              <div className="loc-header-title">
                <MapPin size={18} className="text-amber-500" />
                <h3>Amazon Locations</h3>
              </div>
              <div className="filter-chips-row">
                {['All', 'Locker', 'Fresh', 'Whole Foods'].map(type => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setFilterType(type)}
                    className={`filter-chip ${filterType === type ? 'chip-active' : ''}`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="locations-scroll-list">
              {filteredLocations.map(loc => {
                const isSelected = selectedLocation.id === loc.id;
                return (
                  <div
                    key={loc.id}
                    onClick={() => {
                      setSelectedLocation(loc);
                      setActiveStepIndex(0);
                      showToast(`Route calculated to ${loc.name}`, 'info');
                    }}
                    className={`location-card ${isSelected ? 'card-selected' : ''}`}
                  >
                    <div className="loc-card-header">
                      <span className={`type-tag tag-${loc.type.toLowerCase().replace(/[^a-z]/g, '')}`}>
                        {loc.type}
                      </span>
                      <span className="dist-chip">{loc.distance}</span>
                    </div>

                    <h4 className="loc-title">{loc.name}</h4>
                    <p className="loc-street">{loc.address}</p>

                    {/* ETA Quick Summary Row across modes */}
                    <div className="loc-modes-summary">
                      <span title="Driving time"><Car size={13} /> {loc.routes?.driving?.time}</span>
                      <span title="Walking time"><Footprints size={13} /> {loc.routes?.walking?.time}</span>
                      <span title="Transit time"><Train size={13} /> {loc.routes?.transit?.time}</span>
                      <span title="Bicycling time"><Bike size={13} /> {loc.routes?.bicycling?.time}</span>
                    </div>

                    {/* Available Lockers status */}
                    {loc.availableLockers && (
                      <div className="lockers-avail-pill">
                        <span className="dot-green"></span>
                        <span>Lockers Available: <strong>{loc.availableLockers.small + loc.availableLockers.medium + loc.availableLockers.large} slots</strong></span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Main Column: Maps View + ALL DIRECTIONS PANELS */}
        <div className="directions-main-col">
          {/* Interactive Map Visualizer & Google Map Toggle */}
          <div className="map-display-card card-base">
            <div className="map-card-toolbar">
              <div className="target-summary">
                <MapPin size={20} className="text-amber-500" />
                <div>
                  <h3 className="target-title">{selectedLocation.name}</h3>
                  <span className="target-addr">{selectedLocation.address}</span>
                </div>
              </div>

              <div className="map-view-controls">
                <div className="layer-switcher">
                  <button 
                    type="button" 
                    onClick={() => setMapLayer('vector')}
                    className={`layer-btn ${mapLayer === 'vector' ? 'active' : ''}`}
                  >
                    Route Vector
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setMapLayer('google')}
                    className={`layer-btn ${mapLayer === 'google' ? 'active' : ''}`}
                  >
                    Google Map Live
                  </button>
                </div>

                {!isNavigating && (
                  <button 
                    type="button" 
                    onClick={() => startNavigation(activeMode === 'all' ? 'driving' : activeMode)}
                    className="start-nav-btn"
                  >
                    <Play size={15} />
                    <span>Start Navigation</span>
                  </button>
                )}
              </div>
            </div>

            {/* MAP VIEW CONTAINER */}
            <div className="map-viewport-wrapper">
              {mapLayer === 'vector' ? (
                /* Interactive Vector Canvas Map with all route paths */
                <div className="vector-map-canvas">
                  <svg className="svg-map" viewBox="0 0 800 450" width="100%" height="100%">
                    <defs>
                      <linearGradient id="drivingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#38bdf8" />
                        <stop offset="100%" stopColor="#2563eb" />
                      </linearGradient>
                      <linearGradient id="walkingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#4ade80" />
                        <stop offset="100%" stopColor="#16a34a" />
                      </linearGradient>
                      <linearGradient id="transitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#c084fc" />
                        <stop offset="100%" stopColor="#9333ea" />
                      </linearGradient>
                      <linearGradient id="bikeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#fde047" />
                        <stop offset="100%" stopColor="#d97706" />
                      </linearGradient>
                    </defs>

                    {/* Background City Street Grid */}
                    <rect width="800" height="450" fill="#0f172a" />
                    
                    {/* Road Network Lines */}
                    <line x1="0" y1="100" x2="800" y2="100" stroke="#1e293b" strokeWidth="20" />
                    <line x1="0" y1="200" x2="800" y2="200" stroke="#1e293b" strokeWidth="24" />
                    <line x1="0" y1="320" x2="800" y2="320" stroke="#1e293b" strokeWidth="20" />

                    <line x1="180" y1="0" x2="180" y2="450" stroke="#1e293b" strokeWidth="22" />
                    <line x1="380" y1="0" x2="380" y2="450" stroke="#1e293b" strokeWidth="28" />
                    <line x1="580" y1="0" x2="580" y2="450" stroke="#1e293b" strokeWidth="22" />

                    {/* Diagonal Broadway Boulevard */}
                    <line x1="60" y1="0" x2="740" y2="450" stroke="#243247" strokeWidth="18" />

                    {/* Landmark annotations */}
                    <text x="190" y="240" fill="#64748b" fontSize="11" fontWeight="600">PENN STATION & MSG</text>
                    <text x="390" y="90" fill="#64748b" fontSize="11" fontWeight="600">TIMES SQUARE / 42ND ST</text>
                    <text x="390" y="340" fill="#64748b" fontSize="11" fontWeight="600">HERALD SQ / BROADWAY</text>

                    {/* ALL 4 DIRECTIONS ROUTE PATHS */}
                    {/* 1. Driving Route Path (Cyan Blue) */}
                    <path
                      d="M 180,200 L 380,200 L 380,160 L 420,160"
                      fill="none"
                      stroke="url(#drivingGrad)"
                      strokeWidth={activeMode === 'driving' || activeMode === 'all' ? 8 : 4}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      opacity={activeMode === 'driving' || activeMode === 'all' ? 1 : 0.25}
                    />

                    {/* 2. Walking Route Path (Green Dotted) */}
                    <path
                      d="M 180,200 L 180,160 L 420,160"
                      fill="none"
                      stroke="url(#walkingGrad)"
                      strokeWidth={activeMode === 'walking' || activeMode === 'all' ? 6 : 3}
                      strokeDasharray="6,6"
                      strokeLinecap="round"
                      opacity={activeMode === 'walking' || activeMode === 'all' ? 1 : 0.25}
                    />

                    {/* 3. Transit Route Path (Purple Rail Track) */}
                    <path
                      d="M 180,200 Q 280,140 420,160"
                      fill="none"
                      stroke="url(#transitGrad)"
                      strokeWidth={activeMode === 'transit' || activeMode === 'all' ? 6 : 3}
                      strokeLinecap="round"
                      opacity={activeMode === 'transit' || activeMode === 'all' ? 1 : 0.25}
                    />

                    {/* 4. Bicycling Route Path (Amber Dash) */}
                    <path
                      d="M 180,200 L 260,200 L 360,260 L 420,160"
                      fill="none"
                      stroke="url(#bikeGrad)"
                      strokeWidth={activeMode === 'bicycling' || activeMode === 'all' ? 6 : 3}
                      strokeDasharray="10,6"
                      strokeLinecap="round"
                      opacity={activeMode === 'bicycling' || activeMode === 'all' ? 1 : 0.25}
                    />

                    {/* Start Pin A */}
                    <g transform="translate(180, 200)">
                      <circle r="14" fill="#3b82f6" />
                      <circle r="6" fill="#ffffff" />
                      <text x="-5" y="4" fill="#ffffff" fontSize="11" fontWeight="800">A</text>
                      <text x="-40" y="-18" fill="#93c5fd" fontSize="12" fontWeight="700">Origin (Penn Station)</text>
                    </g>

                    {/* Destination Pin B */}
                    <g transform={`translate(${selectedLocation.coords?.x || 420}, ${selectedLocation.coords?.y || 160})`}>
                      <circle r="16" fill="#f59e0b" filter="drop-shadow(0 0 10px rgba(245, 158, 11, 0.6))" />
                      <circle r="7" fill="#ffffff" />
                      <text x="-5" y="4" fill="#0f172a" fontSize="11" fontWeight="800">B</text>
                      <text x="-50" y="-22" fill="#fcd34d" fontSize="12" fontWeight="700">{selectedLocation.name.split('—')[0]}</text>
                    </g>

                    {/* Animated Navigating Marker */}
                    {isNavigating && (
                      <g transform={`translate(${180 + (activeStepIndex * 70)}, ${200 - (activeStepIndex * 10)})`}>
                        <circle r="18" fill="#10b981" opacity="0.4">
                          <animate attributeName="r" values="12;24;12" dur="1.5s" repeatCount="indefinite" />
                        </circle>
                        <circle r="10" fill="#10b981" />
                        <polygon points="0,-6 6,6 -6,6" fill="#ffffff" />
                      </g>
                    )}
                  </svg>

                  {/* Vector Map Legend Overlay */}
                  <div className="vector-legend">
                    <div className="legend-item"><span className="legend-color bg-blue-500"></span> Driving Route</div>
                    <div className="legend-item"><span className="legend-color bg-emerald-500"></span> Walking Route</div>
                    <div className="legend-item"><span className="legend-color bg-purple-500"></span> Transit Subway</div>
                    <div className="legend-item"><span className="legend-color bg-amber-500"></span> Bicycling Route</div>
                  </div>
                </div>
              ) : (
                /* Google Maps Live Iframe Embed with Directions */
                <iframe
                  title="Google Maps Live Directions"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  scrolling="no"
                  src={mapEmbedUrl}
                  className="google-iframe"
                  loading="lazy"
                  allowFullScreen
                />
              )}
            </div>

            {/* External Navigation Launcher Bar */}
            <div className="nav-external-apps-bar">
              <span className="launch-label">Open Turn-by-Turn in External GPS:</span>
              <div className="launch-links-row">
                <a href={directMapsUrl} target="_blank" rel="noopener noreferrer" className="ext-launch-pill">
                  <Navigation size={14} className="text-blue-500" />
                  <span>Google Maps</span>
                </a>
                <a href={appleMapsUrl} target="_blank" rel="noopener noreferrer" className="ext-launch-pill">
                  <Compass size={14} className="text-slate-700" />
                  <span>Apple Maps</span>
                </a>
                <a href={wazeUrl} target="_blank" rel="noopener noreferrer" className="ext-launch-pill">
                  <Navigation size={14} className="text-cyan-500" />
                  <span>Waze App</span>
                </a>
              </div>
            </div>
          </div>

          {/* ============================================================== */}
          {/* USER REQUIREMENT: "MAPS SHOULD SHOWS ALL THE DIRECTIONS"       */}
          {/* ============================================================== */}

          {/* VIEW A: ALL 4 DIRECTIONS SIMULTANEOUSLY AT A GLANCE */}
          {activeMode === 'all' && (
            <div className="all-directions-matrix">
              <div className="matrix-title-bar">
                <div>
                  <h3 className="matrix-heading">All Directions to {selectedLocation.name}</h3>
                  <p className="matrix-sub">Comprehensive multi-modal routes comparison for Driving, Walking, Public Transit, and Bicycling.</p>
                </div>
                <span className="badge-pass">4 Routes Calculated</span>
              </div>

              <div className="modes-matrix-grid">
                {/* 1. DRIVING CARD */}
                <div className="mode-card mode-driving-card card-base">
                  <div className="card-top-head">
                    <div className="mode-badge badge-driving">
                      <Car size={16} />
                      <span>Driving Route</span>
                    </div>
                    <span className="eta-big">{selectedLocation.routes?.driving?.time}</span>
                  </div>

                  <div className="route-stat-row">
                    <span>Distance: <strong>{selectedLocation.routes?.driving?.distance}</strong></span>
                    <span>Traffic: <strong className="text-success">{selectedLocation.routes?.driving?.traffic}</strong></span>
                  </div>
                  <div className="route-eco-row">
                    <Leaf size={13} className="text-emerald-500" />
                    <span>Est. Footprint: {selectedLocation.routes?.driving?.carbon}</span>
                  </div>

                  <p className="route-summary-text">{selectedLocation.routes?.driving?.summary}</p>

                  <div className="mini-steps-preview">
                    <strong>Key Turn Maneuvers:</strong>
                    <ol className="steps-list">
                      {selectedLocation.routes?.driving?.steps.map((st, i) => (
                        <li key={i} className="mini-step-item">
                          <span className="step-idx">{i + 1}</span>
                          <span className="step-txt">{st.maneuver} ({st.dist})</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  <button 
                    type="button" 
                    onClick={() => startNavigation('driving')} 
                    className="mode-start-btn btn-driving"
                  >
                    <Play size={14} /> Start Driving Guidance
                  </button>
                </div>

                {/* 2. WALKING CARD */}
                <div className="mode-card mode-walking-card card-base">
                  <div className="card-top-head">
                    <div className="mode-badge badge-walking">
                      <Footprints size={16} />
                      <span>Walking Route</span>
                    </div>
                    <span className="eta-big">{selectedLocation.routes?.walking?.time}</span>
                  </div>

                  <div className="route-stat-row">
                    <span>Distance: <strong>{selectedLocation.routes?.walking?.distance}</strong></span>
                    <span>Terrain: <strong>Flat sidewalk</strong></span>
                  </div>
                  <div className="route-eco-row">
                    <Flame size={13} className="text-orange-500" />
                    <span>Burn: {selectedLocation.routes?.walking?.calories}</span>
                  </div>

                  <p className="route-summary-text">{selectedLocation.routes?.walking?.summary}</p>

                  <div className="mini-steps-preview">
                    <strong>Key Walking Steps:</strong>
                    <ol className="steps-list">
                      {selectedLocation.routes?.walking?.steps.map((st, i) => (
                        <li key={i} className="mini-step-item">
                          <span className="step-idx">{i + 1}</span>
                          <span className="step-txt">{st.maneuver} ({st.dist})</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  <button 
                    type="button" 
                    onClick={() => startNavigation('walking')} 
                    className="mode-start-btn btn-walking"
                  >
                    <Play size={14} /> Start Walking Guidance
                  </button>
                </div>

                {/* 3. PUBLIC TRANSIT CARD */}
                <div className="mode-card mode-transit-card card-base">
                  <div className="card-top-head">
                    <div className="mode-badge badge-transit">
                      <Train size={16} />
                      <span>Public Transit</span>
                    </div>
                    <span className="eta-big">{selectedLocation.routes?.transit?.time}</span>
                  </div>

                  <div className="route-stat-row">
                    <span>Line: <strong>{selectedLocation.routes?.transit?.line}</strong></span>
                    <span>Cost: <strong>$2.90 MetroCard</strong></span>
                  </div>
                  <div className="route-eco-row">
                    <Leaf size={13} className="text-emerald-500" />
                    <span>Zero emission subway connection</span>
                  </div>

                  <p className="route-summary-text">{selectedLocation.routes?.transit?.summary}</p>

                  <div className="mini-steps-preview">
                    <strong>Transit Itinerary:</strong>
                    <ol className="steps-list">
                      {selectedLocation.routes?.transit?.steps.map((st, i) => (
                        <li key={i} className="mini-step-item">
                          <span className="step-idx">{i + 1}</span>
                          <span className="step-txt">{st.maneuver}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  <button 
                    type="button" 
                    onClick={() => startNavigation('transit')} 
                    className="mode-start-btn btn-transit"
                  >
                    <Play size={14} /> Start Transit Guide
                  </button>
                </div>

                {/* 4. BICYCLING CARD */}
                <div className="mode-card mode-bicycling-card card-base">
                  <div className="card-top-head">
                    <div className="mode-badge badge-bicycling">
                      <Bike size={16} />
                      <span>Bicycling Route</span>
                    </div>
                    <span className="eta-big">{selectedLocation.routes?.bicycling?.time}</span>
                  </div>

                  <div className="route-stat-row">
                    <span>Distance: <strong>{selectedLocation.routes?.bicycling?.distance}</strong></span>
                    <span>Elevation: <strong>Mostly Flat (+4 ft)</strong></span>
                  </div>
                  <div className="route-eco-row">
                    <Flame size={13} className="text-amber-500" />
                    <span>Burn: {selectedLocation.routes?.bicycling?.calories}</span>
                  </div>

                  <p className="route-summary-text">{selectedLocation.routes?.bicycling?.summary}</p>

                  <div className="mini-steps-preview">
                    <strong>Cycling Turn Guidance:</strong>
                    <ol className="steps-list">
                      {selectedLocation.routes?.bicycling?.steps.map((st, i) => (
                        <li key={i} className="mini-step-item">
                          <span className="step-idx">{i + 1}</span>
                          <span className="step-txt">{st.maneuver} ({st.dist})</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  <button 
                    type="button" 
                    onClick={() => startNavigation('bicycling')} 
                    className="mode-start-btn btn-bicycling"
                  >
                    <Play size={14} /> Start Cycling Guide
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* VIEW B: DETAILED TURN-BY-TURN STEPS FOR ACTIVE SPECIFIC MODE */}
          {activeMode !== 'all' && (
            <div className="mode-detailed-panel card-base">
              <div className="detailed-panel-header">
                <div className="detailed-header-meta">
                  <span className={`mode-badge badge-${activeMode}`}>
                    {activeMode === 'driving' && <Car size={16} />}
                    {activeMode === 'walking' && <Footprints size={16} />}
                    {activeMode === 'transit' && <Train size={16} />}
                    {activeMode === 'bicycling' && <Bike size={16} />}
                    <span>{activeMode.toUpperCase()} DIRECTIONS</span>
                  </span>
                  <h3 className="detailed-heading">Step-by-Step Maneuver Directions</h3>
                  <p className="detailed-sub">{activeRouteObj?.summary}</p>
                </div>

                <div className="detailed-metrics-strip">
                  <div className="metric-cell">
                    <span className="cell-label">Total Time</span>
                    <strong className="cell-value">{activeRouteObj?.time}</strong>
                  </div>
                  <div className="metric-cell">
                    <span className="cell-label">Distance</span>
                    <strong className="cell-value">{activeRouteObj?.distance}</strong>
                  </div>
                  <div className="metric-cell">
                    <span className="cell-label">Condition</span>
                    <strong className="cell-value text-success">{activeRouteObj?.traffic}</strong>
                  </div>
                </div>
              </div>

              {/* Turn-by-Turn Maneuvers Flow List */}
              <div className="turn-maneuvers-list">
                {activeRouteObj?.steps?.map((step, idx) => {
                  const isCurrent = isNavigating && activeStepIndex === idx;
                  return (
                    <div 
                      key={idx} 
                      className={`maneuver-item ${isCurrent ? 'maneuver-active' : ''}`}
                      onClick={() => {
                        setActiveStepIndex(idx);
                        announceTurn(step.maneuver);
                      }}
                    >
                      <div className="maneuver-icon-wrap">
                        {renderTurnIcon(step.icon, 20)}
                      </div>

                      <div className="maneuver-content">
                        <div className="maneuver-head">
                          <strong className="maneuver-street">{step.street}</strong>
                          <span className="maneuver-dist">{step.dist}</span>
                        </div>
                        <p className="maneuver-text">{step.maneuver}</p>
                      </div>

                      <div className="maneuver-action">
                        {isCurrent ? (
                          <span className="active-tag">CURRENT</span>
                        ) : (
                          <span className="step-time">{step.time}</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Hub Return & Security Guarantee Details */}
              <div className="hub-guarantee-bar">
                <div className="guarantee-item">
                  <ShieldCheck size={18} className="text-emerald-500" />
                  <div>
                    <strong>Touchless Boxless Returns</strong>
                    <p>No tape, labels, or shipping boxes needed at this counter.</p>
                  </div>
                </div>

                <div className="guarantee-item">
                  <Clock size={18} className="text-amber-500" />
                  <div>
                    <strong>15-Day Secure Package Hold</strong>
                    <p>Retrieve order using barcode or Bluetooth contactless unlock.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* TOUCHLESS LOCKER QR CODE PASS MODAL */}
      {showQrModal && (
        <div className="modal-backdrop" onClick={() => setShowQrModal(false)}>
          <div className="modal-content card-base" onClick={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <div className="qr-badge">
                <QrCode size={18} className="text-amber-500" />
                <span>Amazon Hub Express Pickup Pass</span>
              </div>
              <button type="button" onClick={() => setShowQrModal(false)} className="close-btn">✕</button>
            </div>

            <div className="modal-body-qr">
              <p className="qr-instructions">
                Scan this contactless barcode at the Amazon Locker terminal screen at <strong>{selectedLocation.name}</strong> to pop open your locker slot.
              </p>

              {/* Simulated Scannable Barcode */}
              <div className="barcode-display">
                <div className="barcode-stripes">
                  {Array.from({ length: 42 }).map((_, i) => (
                    <div 
                      key={i} 
                      className="stripe" 
                      style={{ 
                        width: `${(i % 3 === 0 ? 4 : i % 2 === 0 ? 2 : 1)}px`,
                        height: '75px',
                        background: '#0f172a'
                      }}
                    />
                  ))}
                </div>
                <span className="barcode-number">AMZN-LOC-9841-2026-X8</span>
              </div>

              {/* Locker PIN alternative */}
              <div className="pin-alt-box">
                <span className="pin-label">Or Enter Manual 6-Digit Kiosk PIN:</span>
                <span className="pin-code">8 4 9 2 0 1</span>
              </div>

              {/* Select Locker Size for return drop off */}
              <div className="locker-size-choice">
                <label>Locker Compartment Size:</label>
                <div className="size-buttons-row">
                  {['small', 'medium', 'large'].map(sz => (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => setSelectedLockerSize(sz)}
                      className={`sz-btn ${selectedLockerSize === sz ? 'sz-active' : ''}`}
                    >
                      {sz.toUpperCase()} ({selectedLocation.availableLockers?.[sz] || 5} free)
                    </button>
                  ))}
                </div>
              </div>

              <button 
                type="button" 
                onClick={() => {
                  showToast("Barcode verified! Locker door compartment popped open.", "success");
                  setShowQrModal(false);
                }} 
                className="btn-primary" 
                style={{ width: '100%', marginTop: '1rem' }}
              >
                <Check size={16} /> Simulate Terminal Scan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EMBEDDED STYLES FOR SLEEK NIGHT NAVIGATION UI */}
      <style>{`
        .maps-immersive-root {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
        }

        .maps-cmd-banner {
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          color: #ffffff;
          padding: 2.25rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1.5rem;
          border-left: 5px solid #10b981;
          flex-wrap: wrap;
        }
        .cmd-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(16, 185, 129, 0.15);
          color: #34d399;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.25rem 0.75rem;
          border-radius: var(--radius-full);
          margin-bottom: 0.6rem;
          border: 1px solid rgba(16, 185, 129, 0.3);
        }
        .cmd-title {
          font-size: 2rem;
          color: #ffffff;
          margin-bottom: 0.5rem;
        }
        .cmd-subtitle {
          font-size: 0.95rem;
          color: #94a3b8;
          max-width: 680px;
          line-height: 1.6;
        }
        .cmd-banner-actions {
          display: flex;
          gap: 0.85rem;
          flex-wrap: wrap;
        }

        /* Route Inputs Bar */
        .route-inputs-card {
          padding: 1.5rem;
          background: #ffffff;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .route-fields-row {
          display: grid;
          grid-template-columns: 1fr 1fr 1.2fr;
          gap: 1.25rem;
          align-items: center;
        }
        @media (max-width: 900px) {
          .route-fields-row {
            grid-template-columns: 1fr;
          }
        }
        .input-group-origin, .input-group-dest {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: #f8fafc;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          padding: 0.65rem 0.95rem;
        }
        .point-indicator {
          width: 28px;
          height: 28px;
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 0.82rem;
          flex-shrink: 0;
        }
        .point-a {
          background: #3b82f6;
          color: #ffffff;
        }
        .point-b {
          background: #f59e0b;
          color: #0f172a;
        }
        .field-inner {
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .field-inner label {
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          color: var(--color-text-muted);
        }
        .geo-input {
          border: none;
          background: transparent;
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--color-text-main);
          outline: none;
          padding: 0.2rem 0;
        }
        .dest-display {
          display: flex;
          flex-direction: column;
        }
        .dest-display strong {
          font-size: 0.9rem;
          color: var(--color-navy-dark);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .dest-display span {
          font-size: 0.76rem;
          color: var(--color-text-muted);
        }
        .search-box-form {
          display: flex;
          gap: 0.5rem;
        }
        .search-input {
          flex: 1;
          background: #f8fafc;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          padding: 0.65rem 0.95rem;
        }
        .search-btn {
          background: var(--color-navy-dark);
          color: #ffffff;
          border: none;
          border-radius: var(--radius-md);
          padding: 0.65rem 1.25rem;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          cursor: pointer;
        }

        /* Mode Selection Bar */
        .mode-selection-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 1rem;
          border-top: 1px solid var(--color-border);
          gap: 1rem;
          flex-wrap: wrap;
        }
        .mode-prompt {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--color-navy-dark);
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .mode-pills-row {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }
        .mode-tab {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.55rem 0.95rem;
          border-radius: var(--radius-md);
          border: 1px solid var(--color-border);
          background: #f8fafc;
          color: var(--color-text-main);
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .mode-tab:hover {
          background: #e2e8f0;
        }
        .active-all {
          background: #0f172a !important;
          color: #ffffff !important;
          border-color: #0f172a !important;
        }
        .active-driving {
          background: #eff6ff !important;
          color: #1d4ed8 !important;
          border-color: #3b82f6 !important;
        }
        .active-walking {
          background: #f0fdf4 !important;
          color: #15803d !important;
          border-color: #22c55e !important;
        }
        .active-transit {
          background: #faf5ff !important;
          color: #7e22ce !important;
          border-color: #a855f7 !important;
        }
        .active-bicycling {
          background: #fffbeb !important;
          color: #b45309 !important;
          border-color: #f59e0b !important;
        }

        /* Live GPS HUD */
        .active-gps-hud {
          background: #0b1120;
          color: #ffffff;
          padding: 1.5rem 2rem;
          border-left: 6px solid #10b981;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.4);
          animation: slideDown 300ms ease;
        }
        .pulse-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #10b981;
          display: inline-block;
          animation: pulse 1.2s infinite;
        }
        @keyframes pulse {
          0% { transform: scale(0.9); opacity: 0.7; }
          50% { transform: scale(1.3); opacity: 1; }
          100% { transform: scale(0.9); opacity: 0.7; }
        }
        .gps-live-badge {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.78rem;
          letter-spacing: 0.06em;
          color: #34d399;
          font-weight: 800;
        }
        .gps-turn-display {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          flex: 1;
        }
        .turn-direction-icon {
          width: 60px;
          height: 60px;
          background: #1e293b;
          border-radius: var(--radius-lg);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #10b981;
          border: 1px solid #334155;
        }
        .turn-instruction-col {
          display: flex;
          flex-direction: column;
        }
        .turn-dist-countdown {
          font-size: 0.85rem;
          font-weight: 700;
          color: #38bdf8;
          text-transform: uppercase;
        }
        .turn-primary-instruction {
          font-size: 1.4rem;
          color: #ffffff;
          margin: 0.2rem 0;
        }
        .turn-street-tag {
          font-size: 0.85rem;
          color: #94a3b8;
        }
        .gps-telemetry-col {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }
        .speedometer-box {
          background: #1e293b;
          padding: 0.6rem 1rem;
          border-radius: var(--radius-md);
          text-align: center;
          border: 1px solid #334155;
        }
        .speed-val {
          display: block;
          font-size: 1.8rem;
          font-weight: 800;
          color: #10b981;
          line-height: 1;
        }
        .speed-unit {
          font-size: 0.68rem;
          color: #94a3b8;
          font-weight: 700;
        }
        .gps-controls-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .gps-btn-icon {
          background: #1e293b;
          border: 1px solid #334155;
          color: #ffffff;
          padding: 0.75rem;
          border-radius: var(--radius-md);
          cursor: pointer;
        }
        .gps-btn-stop {
          background: #ef4444;
          color: #ffffff;
          border: none;
          padding: 0.75rem 1.25rem;
          border-radius: var(--radius-md);
          font-weight: 700;
          cursor: pointer;
        }

        /* Layout Grid */
        .maps-content-grid {
          display: grid;
          grid-template-columns: 340px 1fr;
          gap: 1.75rem;
          align-items: start;
        }
        @media (max-width: 1024px) {
          .maps-content-grid {
            grid-template-columns: 1fr;
          }
        }

        /* Locations Sidebar */
        .locations-box {
          background: #ffffff;
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .loc-box-header {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid var(--color-border);
        }
        .loc-header-title {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .loc-header-title h3 {
          font-size: 1.1rem;
        }
        .filter-chips-row {
          display: flex;
          gap: 0.4rem;
          flex-wrap: wrap;
        }
        .filter-chip {
          padding: 0.25rem 0.65rem;
          border-radius: var(--radius-full);
          border: 1px solid var(--color-border);
          background: #f8fafc;
          font-size: 0.75rem;
          font-weight: 600;
          cursor: pointer;
        }
        .chip-active {
          background: var(--color-navy-dark);
          color: #ffffff;
          border-color: var(--color-navy-dark);
        }
        .locations-scroll-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          max-height: 700px;
          overflow-y: auto;
        }
        .location-card {
          padding: 1rem;
          border-radius: var(--radius-md);
          border: 1px solid var(--color-border);
          background: #ffffff;
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .location-card:hover {
          border-color: var(--color-amber);
          transform: translateY(-2px);
        }
        .card-selected {
          border-color: var(--color-amber) !important;
          background: #fffbeb !important;
          box-shadow: 0 4px 12px rgba(245, 158, 11, 0.15);
        }
        .loc-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.4rem;
        }
        .type-tag {
          font-size: 0.68rem;
          font-weight: 700;
          text-transform: uppercase;
          padding: 0.15rem 0.5rem;
          border-radius: var(--radius-full);
        }
        .tag-locker { background: #fef3c7; color: #92400e; }
        .tag-freshstore { background: #dcfce7; color: #166534; }
        .tag-wholefoods { background: #dbeafe; color: #1e40af; }
        .tag-customlocation { background: #ede9fe; color: #6b21a8; }
        .dist-chip {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--color-text-muted);
        }
        .loc-title {
          font-size: 0.95rem;
          margin-bottom: 0.2rem;
          color: var(--color-navy-dark);
        }
        .loc-street {
          font-size: 0.8rem;
          color: var(--color-text-muted);
          margin-bottom: 0.6rem;
        }
        .loc-modes-summary {
          display: flex;
          gap: 0.75rem;
          font-size: 0.75rem;
          font-weight: 600;
          color: #475569;
          background: #f1f5f9;
          padding: 0.35rem 0.6rem;
          border-radius: var(--radius-sm);
          margin-bottom: 0.5rem;
        }
        .loc-modes-summary span {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
        }
        .lockers-avail-pill {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.72rem;
          color: #166534;
        }
        .dot-green {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #16a34a;
        }

        /* Right Column Map & Directions */
        .directions-main-col {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
        }

        /* Map View Card */
        .map-display-card {
          background: #ffffff;
          overflow: hidden;
        }
        .map-card-toolbar {
          padding: 1rem 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid var(--color-border);
          gap: 1rem;
          flex-wrap: wrap;
        }
        .target-summary {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .target-title {
          font-size: 1.15rem;
          color: var(--color-navy-dark);
        }
        .target-addr {
          font-size: 0.8rem;
          color: var(--color-text-muted);
          display: block;
        }
        .map-view-controls {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .layer-switcher {
          display: flex;
          background: #f1f5f9;
          border-radius: var(--radius-md);
          padding: 0.2rem;
        }
        .layer-btn {
          border: none;
          background: transparent;
          font-size: 0.78rem;
          font-weight: 600;
          padding: 0.35rem 0.75rem;
          border-radius: var(--radius-sm);
          cursor: pointer;
          color: var(--color-text-muted);
        }
        .layer-btn.active {
          background: #ffffff;
          color: var(--color-navy-dark);
          box-shadow: var(--shadow-sm);
        }
        .start-nav-btn {
          background: #10b981;
          color: #ffffff;
          border: none;
          border-radius: var(--radius-md);
          padding: 0.55rem 1rem;
          font-size: 0.85rem;
          font-weight: 700;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          cursor: pointer;
        }
        .start-nav-btn:hover {
          background: #059669;
        }

        /* Map Viewport */
        .map-viewport-wrapper {
          width: 100%;
          height: 380px;
          position: relative;
          background: #0f172a;
        }
        .vector-map-canvas {
          width: 100%;
          height: 100%;
          position: relative;
        }
        .vector-legend {
          position: absolute;
          bottom: 1rem;
          left: 1rem;
          background: rgba(15, 23, 42, 0.85);
          backdrop-filter: blur(4px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 0.6rem 0.85rem;
          border-radius: var(--radius-md);
          display: flex;
          gap: 0.85rem;
          font-size: 0.75rem;
          color: #cbd5e1;
          font-weight: 600;
        }
        .legend-item {
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }
        .legend-color {
          width: 10px;
          height: 10px;
          border-radius: 2px;
        }
        .bg-blue-500 { background: #3b82f6; }
        .bg-emerald-500 { background: #10b981; }
        .bg-purple-500 { background: #a855f7; }
        .bg-amber-500 { background: #f59e0b; }
        .google-iframe {
          border: none;
        }
        .nav-external-apps-bar {
          padding: 0.85rem 1.5rem;
          background: #f8fafc;
          border-top: 1px solid var(--color-border);
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.82rem;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .launch-label {
          font-weight: 700;
          color: var(--color-text-muted);
        }
        .launch-links-row {
          display: flex;
          gap: 0.6rem;
        }
        .ext-launch-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          background: #ffffff;
          border: 1px solid var(--color-border);
          padding: 0.3rem 0.75rem;
          border-radius: var(--radius-full);
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--color-navy-dark);
          transition: all var(--transition-fast);
        }
        .ext-launch-pill:hover {
          border-color: var(--color-amber);
        }

        /* ALL DIRECTIONS MATRIX (4 MODES AT ONCE) */
        .all-directions-matrix {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .matrix-title-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .matrix-heading {
          font-size: 1.4rem;
          color: var(--color-navy-dark);
        }
        .matrix-sub {
          font-size: 0.88rem;
          color: var(--color-text-muted);
        }
        .modes-matrix-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.25rem;
        }
        @media (max-width: 800px) {
          .modes-matrix-grid {
            grid-template-columns: 1fr;
          }
        }
        .mode-card {
          background: #ffffff;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          border-top: 4px solid transparent;
        }
        .mode-driving-card { border-top-color: #3b82f6; }
        .mode-walking-card { border-top-color: #10b981; }
        .mode-transit-card { border-top-color: #a855f7; }
        .mode-bicycling-card { border-top-color: #f59e0b; }

        .card-top-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .mode-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.75rem;
          font-weight: 800;
          padding: 0.25rem 0.65rem;
          border-radius: var(--radius-full);
        }
        .badge-driving { background: #eff6ff; color: #1e40af; }
        .badge-walking { background: #f0fdf4; color: #166534; }
        .badge-transit { background: #faf5ff; color: #6b21a8; }
        .badge-bicycling { background: #fffbeb; color: #92400e; }

        .eta-big {
          font-size: 1.6rem;
          font-weight: 800;
          color: var(--color-navy-dark);
        }
        .route-stat-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.82rem;
          color: var(--color-text-muted);
        }
        .route-eco-row {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.78rem;
          font-weight: 600;
          color: #475569;
          background: #f8fafc;
          padding: 0.35rem 0.6rem;
          border-radius: var(--radius-sm);
        }
        .route-summary-text {
          font-size: 0.85rem;
          color: var(--color-text-main);
          font-weight: 500;
        }
        .mini-steps-preview {
          background: #f8fafc;
          border: 1px solid var(--color-border);
          padding: 0.85rem;
          border-radius: var(--radius-md);
        }
        .mini-steps-preview strong {
          font-size: 0.75rem;
          text-transform: uppercase;
          color: var(--color-text-muted);
          display: block;
          margin-bottom: 0.5rem;
        }
        .steps-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        .mini-step-item {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          font-size: 0.78rem;
          color: var(--color-text-main);
        }
        .step-idx {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #e2e8f0;
          font-weight: 700;
          font-size: 0.7rem;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .mode-start-btn {
          margin-top: auto;
          border: none;
          padding: 0.65rem 1rem;
          border-radius: var(--radius-md);
          font-size: 0.85rem;
          font-weight: 700;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          cursor: pointer;
          color: #ffffff;
        }
        .btn-driving { background: #2563eb; }
        .btn-walking { background: #16a34a; }
        .btn-transit { background: #9333ea; }
        .btn-bicycling { background: #d97706; }

        /* VIEW B: DETAILED TURN-BY-TURN PANEL */
        .mode-detailed-panel {
          background: #ffffff;
          padding: 1.75rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .detailed-panel-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid var(--color-border);
          padding-bottom: 1.25rem;
          gap: 1.5rem;
          flex-wrap: wrap;
        }
        .detailed-heading {
          font-size: 1.4rem;
          color: var(--color-navy-dark);
          margin: 0.3rem 0;
        }
        .detailed-sub {
          font-size: 0.85rem;
          color: var(--color-text-muted);
        }
        .detailed-metrics-strip {
          display: flex;
          gap: 1rem;
        }
        .metric-cell {
          background: #f8fafc;
          border: 1px solid var(--color-border);
          padding: 0.6rem 1rem;
          border-radius: var(--radius-md);
          text-align: center;
        }
        .cell-label {
          font-size: 0.7rem;
          text-transform: uppercase;
          font-weight: 700;
          color: var(--color-text-muted);
          display: block;
        }
        .cell-value {
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--color-navy-dark);
        }

        /* Maneuver Items */
        .turn-maneuvers-list {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }
        .maneuver-item {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          padding: 1rem 1.25rem;
          border-radius: var(--radius-md);
          border: 1px solid var(--color-border);
          background: #ffffff;
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .maneuver-item:hover {
          border-color: #3b82f6;
          background: #f8fafc;
        }
        .maneuver-active {
          border-color: #10b981 !important;
          background: #f0fdf4 !important;
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.15);
        }
        .maneuver-icon-wrap {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-md);
          background: #f1f5f9;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-navy-dark);
          flex-shrink: 0;
        }
        .maneuver-content {
          flex: 1;
        }
        .maneuver-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.2rem;
        }
        .maneuver-street {
          font-size: 0.95rem;
          color: var(--color-navy-dark);
        }
        .maneuver-dist {
          font-size: 0.8rem;
          font-weight: 700;
          color: #2563eb;
        }
        .maneuver-text {
          font-size: 0.88rem;
          color: var(--color-text-muted);
        }
        .active-tag {
          background: #10b981;
          color: #ffffff;
          font-size: 0.7rem;
          font-weight: 800;
          padding: 0.2rem 0.6rem;
          border-radius: var(--radius-full);
        }
        .step-time {
          font-size: 0.78rem;
          color: var(--color-text-muted);
        }

        /* Hub Guarantee */
        .hub-guarantee-bar {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
          padding-top: 1rem;
          border-top: 1px solid var(--color-border);
        }
        .guarantee-item {
          display: flex;
          gap: 0.75rem;
          font-size: 0.85rem;
        }
        .guarantee-item strong {
          display: block;
          color: var(--color-navy-dark);
        }
        .guarantee-item p {
          color: var(--color-text-muted);
          font-size: 0.78rem;
        }

        /* QR Pass Modal */
        .modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(15, 23, 42, 0.75);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2100;
          padding: 1.5rem;
        }
        .modal-content {
          background: #ffffff;
          width: 100%;
          max-width: 480px;
          border-radius: var(--radius-xl);
          padding: 2rem;
          box-shadow: var(--shadow-xl);
          animation: popIn 250ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes popIn {
          from { transform: scale(0.92); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .modal-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.25rem;
        }
        .qr-badge {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 700;
          font-size: 0.95rem;
          color: var(--color-navy-dark);
        }
        .close-btn {
          border: none;
          background: #f1f5f9;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          cursor: pointer;
          font-weight: 700;
        }
        .qr-instructions {
          font-size: 0.88rem;
          color: var(--color-text-muted);
          line-height: 1.5;
          margin-bottom: 1.25rem;
        }
        .barcode-display {
          background: #f8fafc;
          border: 2px dashed var(--color-border);
          border-radius: var(--radius-lg);
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.85rem;
        }
        .barcode-stripes {
          display: flex;
          align-items: center;
          gap: 3px;
        }
        .barcode-number {
          font-family: monospace;
          font-size: 1rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          color: var(--color-navy-dark);
        }
        .pin-alt-box {
          margin-top: 1rem;
          background: #fffbeb;
          border: 1px solid #fef3c7;
          border-radius: var(--radius-md);
          padding: 0.75rem;
          text-align: center;
        }
        .pin-label {
          display: block;
          font-size: 0.75rem;
          color: #92400e;
          font-weight: 600;
        }
        .pin-code {
          font-size: 1.5rem;
          font-weight: 800;
          letter-spacing: 0.35em;
          color: #b45309;
        }
        .locker-size-choice {
          margin-top: 1rem;
        }
        .locker-size-choice label {
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--color-text-muted);
          display: block;
          margin-bottom: 0.4rem;
        }
        .size-buttons-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.5rem;
        }
        .sz-btn {
          padding: 0.55rem;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          background: #f8fafc;
          font-size: 0.75rem;
          font-weight: 700;
          cursor: pointer;
        }
        .sz-active {
          background: var(--color-navy-dark);
          color: #ffffff;
          border-color: var(--color-navy-dark);
        }
      `}</style>
    </div>
  );
}
