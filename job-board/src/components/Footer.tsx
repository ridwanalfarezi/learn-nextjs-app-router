export default function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-5xl space-y-5 px-3 py-5">
        <div className="text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Job Board. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
