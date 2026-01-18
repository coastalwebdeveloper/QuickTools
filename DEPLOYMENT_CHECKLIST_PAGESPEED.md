# PageSpeed Optimization Deployment Checklist

## ✅ Pre-Deployment Checklist

### 1. Build & Test Locally
```bash
# Install new dependencies
npm install

# Build production bundle
npm run build

# Test locally
npm run preview
```

### 2. Verify Optimizations
- [ ] Check bundle sizes in `dist/assets/`
- [ ] Verify lazy loading works (check Network tab)
- [ ] Test all routes load correctly
- [ ] Confirm analytics still fires (after 3s delay)
- [ ] Check fonts load properly

### 3. Performance Testing
```bash
# Run Lighthouse locally
npx lighthouse http://localhost:4173 --view

# Check mobile score
npx lighthouse http://localhost:4173 --preset=mobile --view
```

## 🚀 Deployment Steps

### Option 1: Vercel (Recommended)
```bash
# Deploy to production
vercel --prod

# Verify deployment
# Check: https://your-domain.com
```

### Option 2: Other Hosting
1. Upload `dist/` folder contents
2. Ensure server has:
   - Gzip/Brotli compression enabled
   - Proper cache headers (use vercel.json as reference)
   - SPA routing configured

## 📊 Post-Deployment Verification

### 1. Test Live Site
- [ ] Visit https://your-domain.com
- [ ] Open DevTools > Network tab
- [ ] Verify:
  - Main bundle < 300KB
  - Fonts load after 3s
  - Analytics loads after 3s
  - Routes lazy load on navigation

### 2. Run PageSpeed Insights
```
Visit: https://pagespeed.web.dev/
Enter: https://your-domain.com
Check: Mobile score ≥ 85
```

### 3. Verify Core Web Vitals
- [ ] FCP < 1.8s (Good)
- [ ] LCP < 2.5s (Good)
- [ ] TBT < 300ms (Good)
- [ ] CLS < 0.1 (Good)

### 4. Check Search Console
- [ ] Visit Google Search Console
- [ ] Check Core Web Vitals report
- [ ] Verify no new errors

## 🔧 Troubleshooting

### Issue: Routes not loading
**Solution:** Check vercel.json rewrites are deployed

### Issue: Fonts not loading
**Solution:** Verify CSP headers allow fonts.gstatic.com

### Issue: Analytics not firing
**Solution:** Wait 3+ seconds, check Network tab for gtag.js

### Issue: Images not lazy loading
**Solution:** Use LazyImage component from src/components/LazyImage.tsx

## 📈 Monitoring Setup

### 1. Enable Real User Monitoring
Add to your analytics:
```typescript
import { reportWebVitals } from './utils/performance';

reportWebVitals((metric) => {
  // Send to your analytics
  gtag('event', metric.name, {
    value: Math.round(metric.value),
    metric_id: metric.id,
    metric_value: metric.value,
    metric_delta: metric.delta,
  });
});
```

### 2. Set Up Alerts
- [ ] Configure alerts for Core Web Vitals degradation
- [ ] Monitor bundle size increases
- [ ] Track error rates

## 🎯 Expected Results

### Before Optimization
- Mobile Score: 40-60
- FCP: ~2.5s
- LCP: ~4.0s
- TBT: ~800ms
- Bundle: ~800KB

### After Optimization
- Mobile Score: **85-95** ✅
- FCP: **~1.2s** ✅
- LCP: **~2.4s** ✅
- TBT: **~250ms** ✅
- Bundle: **~250KB** ✅

## 🔄 Maintenance

### Weekly
- [ ] Check PageSpeed Insights score
- [ ] Review Core Web Vitals in Search Console
- [ ] Monitor bundle size on new builds

### Monthly
- [ ] Audit dependencies for updates
- [ ] Review and optimize new images
- [ ] Check for unused code

### Quarterly
- [ ] Full performance audit
- [ ] Update optimization strategies
- [ ] Review and update service worker

## 📚 Additional Resources

- [Web Vitals](https://web.dev/vitals/)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
- [Vite Performance](https://vitejs.dev/guide/performance.html)
- [React Performance](https://react.dev/learn/render-and-commit)

## 🎉 Success Criteria

Your optimization is successful when:
- ✅ Mobile PageSpeed score ≥ 85
- ✅ All Core Web Vitals in "Good" range
- ✅ Initial bundle < 300KB
- ✅ FCP < 1.8s
- ✅ LCP < 2.5s
- ✅ TBT < 300ms
- ✅ No functionality broken
- ✅ SEO maintained
- ✅ Accessibility score ≥ 90

## 🆘 Support

If you encounter issues:
1. Check PAGESPEED_OPTIMIZATIONS.md for details
2. Review OPTIMIZATION_SUMMARY.md for quick reference
3. Test locally first with `npm run preview`
4. Verify all files were deployed correctly

---

**Last Updated:** 2024
**Target Score:** 85+ Mobile
**Status:** Ready for Deployment ✅
