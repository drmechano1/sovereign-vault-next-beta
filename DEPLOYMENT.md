# Sovereign Vault - Production Deployment Guide

## 🔐 Beta Password Protection

The site now includes premium password protection for beta access. All pages are protected except `/auth`.

### Production Environment Setup

#### Required Environment Variable

Add this to your production environment (Vercel, Netlify, or your hosting platform):

```
BETA_PASSWORD=your_secure_password_here
```

**⚠️ IMPORTANT SECURITY NOTES:**
- Use a strong, unique password for production
- Never commit `.env` files to git
- The password is stored server-side only (not exposed to client)
- Sessions persist for 7 days via secure HTTP-only cookies

---

## 📋 Deployment Steps

### For Vercel (Recommended)

1. **Connect Repository**
   - Go to [vercel.com](https://vercel.com)
   - Import the `sovereign-vault-next` repository
   - Select the `master` branch

2. **Configure Environment Variables**
   - In Project Settings → Environment Variables
   - Add: `BETA_PASSWORD` = `your_secure_password`
   - Apply to: Production, Preview, Development

3. **Deploy**
   - Click "Deploy"
   - Your site will be live at `sovereignvault.io` (after domain configuration)

4. **Custom Domain**
   - Go to Project Settings → Domains
   - Add `sovereignvault.io` and `www.sovereignvault.io`
   - Update DNS records as instructed

### For Other Platforms

#### Netlify
```bash
# In Netlify Dashboard → Site Settings → Environment Variables
BETA_PASSWORD=your_secure_password
```

#### Self-Hosted (PM2/Docker)
```bash
# Create .env file on server (NOT in git)
echo "BETA_PASSWORD=your_secure_password" > .env

# Build and start
pnpm install
pnpm build
pnpm start
```

---

## 🧪 Testing Password Protection

1. Visit your deployed site (e.g., `sovereignvault.io`)
2. You should be redirected to `/auth` automatically
3. Enter the password you set in `BETA_PASSWORD`
4. Click "Access Beta"
5. You should be redirected to the homepage
6. Navigate to any page - you should stay logged in
7. Clear cookies or use incognito to test the protection again

---

## 🎨 Password Page Features

- **Premium Design**: Glittering animated background matching site branding
- **Gradient Branding**: Blue-to-purple "Sovereign Vault" text
- **Glassmorphism**: Dark translucent form with backdrop blur
- **Responsive**: Works on all devices
- **Session Persistence**: 7-day cookie-based authentication
- **Security**: HTTP-only cookies, server-side validation

---

## 🔧 Smart Contract Deployment (Amoy Testnet)

### Prerequisites
```bash
# Create .env file locally (NOT in git)
PRIVATE_KEY=0x...  # Your Amoy testnet wallet private key
BETA_PASSWORD=your_beta_password
```

### Deploy Contracts
```bash
# 1. Deploy NameNFTV2
npx hardhat run scripts/deploy-name-nft-v2.js --network amoy

# 2. Add NameNFTV2 address to .env
echo "NAME_NFT_V2_ADDRESS=0x..." >> .env

# 3. Deploy NFTVaultV2
npx hardhat run scripts/deploy-nft-vault-v2.js --network amoy

# 4. Deploy AssetVaultV2
npx hardhat run scripts/deploy-asset-vault-v2.js --network amoy

# 5. Deploy EscrowFactoryV2
npx hardhat run scripts/deploy-escrow-v2.js --network amoy
```

### Save Deployed Addresses
Create `config/contracts.amoy.json` with deployed addresses for frontend integration.

---

## 📝 Checklist Before Going Live

- [ ] Set strong `BETA_PASSWORD` in production environment
- [ ] Test password protection on staging/preview deployment
- [ ] Verify all pages redirect to `/auth` when not authenticated
- [ ] Confirm successful login redirects to homepage
- [ ] Test session persistence (stays logged in across pages)
- [ ] Verify password page design matches brand standards
- [ ] Deploy smart contracts to testnet (if needed)
- [ ] Update contract addresses in config files
- [ ] Test on mobile devices
- [ ] Clear browser cache and test again

---

## 🆘 Troubleshooting

### "Beta password not configured" error
- Ensure `BETA_PASSWORD` is set in environment variables
- Restart the server/redeploy after adding the variable

### Redirect loop
- Clear browser cookies
- Check middleware configuration in `src/middleware.ts`

### Password not working
- Verify the password matches exactly (case-sensitive)
- Check server logs for authentication errors

### Session expires too quickly
- Check cookie settings in `src/app/api/auth/verify/route.ts`
- Default is 7 days (`maxAge: 60 * 60 * 24 * 7`)

---

## 🔒 Security Best Practices

1. **Use Environment Variables**: Never hard-code passwords
2. **Strong Passwords**: Use a password manager to generate secure passwords
3. **HTTPS Only**: Ensure production uses HTTPS (automatic on Vercel/Netlify)
4. **Regular Updates**: Change beta password periodically
5. **Monitor Access**: Check server logs for unauthorized attempts
6. **Testnet Wallets**: Use dedicated testnet wallets, never mainnet private keys

---

## 📞 Support

For deployment issues or questions, contact the development team.

**Repository**: https://github.com/drmechano1/sovereign-vault-next
**Live Site**: https://sovereignvault.io
