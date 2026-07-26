if [ -z "$VERSION" ]; then
  echo "❌ Error: VERSION environment variable is not set"
  echo "Usage: VERSION=x.x.x ./scripts/publish.sh"
  exit 1
fi

echo "🐸 $VERSION"

pnpm i
rm -rf dist
pnpm build
npx tsx scripts/deployment-package-json.ts "${VERSION:-null}"
npm publish --access public
