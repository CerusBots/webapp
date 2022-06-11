with import <nixpkgs> {};

stdenv.mkDerivation {
    name = "cerus-webapp";
    buildInputs = [
        nodejs-16_x tilt minikube python2
    ];
    shellHooks = ''
        export PATH="$PWD/node_modules/.bin/:$PATH"
        alias run="npm run"
    '';
}
