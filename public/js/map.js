/* eslint-disable */

export function initializeMap(locations) {
  if (!locations) return;

  mapboxgl.accessToken =
    'pk.eyJ1Ijoic2hyZWVrYW50LTA0IiwiYSI6ImNtNXhub3VndTA2NnMybXNnYzRoZGwxN2YifQ.-iQoKF4uq86JmCcPOXrvZA';

  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl');
  if (!gl) {
    console.error('Failed to create WebGL context.');
  } else {
    console.log('WebGL context created successfully.');
  }

  let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/shreekant-04/cm5xnvb88003l01r16i3v2s8a',
    context: gl, // Pass WebGL context explicitly
    scrollZoom: false
  });

  const bounds = new mapboxgl.LngLatBounds();
  locations.forEach(loc => {
    // Create marker
    const el = document.createElement('div');
    el.className = 'marker';

    // Add marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom'
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // Add popup
    new mapboxgl.Popup({
      offset: 30
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    // Extend map bounds to include current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100
    }
  });
}
