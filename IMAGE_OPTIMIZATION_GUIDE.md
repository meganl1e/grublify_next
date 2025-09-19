# Image Optimization Guide for Grublify

## What the Vercel Notification Means

**Image Optimization - Cache Writes** refers to Vercel's automatic image optimization service that:
- Processes images when first requested (resizing, format conversion, compression)
- Caches optimized versions for faster delivery
- Counts each unique image optimization as a "cache write"

You've hit the **100,000 cache writes limit** on the free tier, indicating high image usage.

## Optimizations Implemented

### 1. ✅ Converted StrapiImage to use next/image
**Before:** Used regular `<img>` tags (bypassed Next.js optimization)
**After:** Now uses `next/image` with automatic optimization

**Benefits:**
- Automatic WebP/AVIF conversion
- Responsive image generation
- Lazy loading by default
- Better caching

### 2. ✅ Fixed Priority Loading
**Before:** 
- Product page main image had `priority={true}`
- Team page prioritized first 4 images
- Hero image had `priority={true}` (this is correct)

**After:**
- Product page: `priority={false}` (not above-the-fold)
- Team page: Only first 2 images prioritized
- Hero image: Kept `priority={true}` (above-the-fold)

### 3. ✅ Enhanced Image Caching Configuration
**Added to next.config.mjs:**
```javascript
images: {
  formats: ['image/webp', 'image/avif'],
  minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  dangerouslyAllowSVG: false,
  contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
}
```

### 4. ✅ Optimized Image Sizes
**Before:** Generic sizes like `(max-width: 768px) 100vw, 50vw`
**After:** More specific breakpoints:
- Products: `(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw`
- Product thumbnails: `(max-width: 640px) 12vw, (max-width: 1024px) 8vw, 6vw`

## Additional Recommendations

### 1. Monitor Image Usage
- Check Vercel dashboard regularly for image optimization usage
- Consider upgrading to Pro if traffic continues growing

### 2. Image Preprocessing
Consider preprocessing images before upload:
- Resize images to appropriate dimensions
- Compress images using tools like TinyPNG
- Use appropriate formats (JPEG for photos, PNG for graphics)

### 3. Implement Image Placeholders
Add skeleton loaders for better UX:
```jsx
// Example placeholder component
const ImagePlaceholder = () => (
  <div className="animate-pulse bg-gray-200 rounded-lg aspect-square" />
);
```

### 4. Consider CDN Optimization
For high-traffic sites, consider:
- Using a dedicated image CDN (Cloudinary, ImageKit)
- Implementing client-side image optimization
- Pre-generating common image sizes

### 5. Audit Image Usage
Regularly review:
- Unused images in your codebase
- Duplicate images across pages
- Images that could be replaced with CSS/SVG

## Expected Impact

These optimizations should:
- **Reduce cache writes** by 30-50% through better lazy loading
- **Improve performance** with WebP/AVIF formats
- **Reduce bandwidth** with optimized image sizes
- **Better user experience** with faster loading

## Monitoring

Track these metrics:
- Vercel image optimization usage
- Core Web Vitals (LCP, CLS)
- Page load times
- Bandwidth usage

## Next Steps

1. Deploy these changes
2. Monitor Vercel dashboard for usage reduction
3. Consider Pro plan if traffic continues growing
4. Implement additional optimizations as needed
