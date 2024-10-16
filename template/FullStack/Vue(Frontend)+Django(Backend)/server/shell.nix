{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  buildInputs = [
    pkgs.python312
    pkgs.python312Packages.django
    pkgs.python312Packages.djangorestframework
    pkgs.python312Packages.django-cors-headers
    pkgs.python312Packages.djangorestframework-simplejwt
    pkgs.python312Packages.python-dotenv
  ];

  shellHook = ''
    echo "Python environment is ready!"
  '';
}
