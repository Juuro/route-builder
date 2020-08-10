const generateGPX = trkpts => `<?xml version='1.0' encoding='UTF-8'?>
<gpx version="1.1" creator="https://blissful-feynman-b21b41.netlify.app/" xmlns="http://www.topografix.com/GPX/1/1" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd">
<metadata>
  <name>Cross Country Running Route</name>
  <author>
  <link href="https://blissful-feynman-b21b41.netlify.app/">
      <text>Route Builder</text>
      <type>text/html</type>
  </link>
  </author>
</metadata>
<trk>
  <name>Cross Country Running Route</name>
  <trkseg>
${trkpts}
  </trkseg>
</trk>
</gpx>`

export default generateGPX
