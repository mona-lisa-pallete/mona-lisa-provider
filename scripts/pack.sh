    app_name="davinciprovider";
    branch_name='master';
    commiter_email=$(git show -s --format='%an' $4)
    commiter=${commiter_email#@*}


    # 获取分支名
    while [[ $# -gt 1 ]]
    do
    key="$1"

    case $key in
        -b | -branch)
        branch_name="$2"
        shift # past argument
        ;;
    esac
    shift # past argument or value
    done


    #==========================================
    #  构建工作。。。
    #==========================================

    pack_time=`date +'%Y-%m-%d-%H%M%S'`
    branch_name=`echo $branch_name | sed 's/\//-/g'`
    file_name="$app_name-[$commiter]-$branch_name-$pack_time.tgz"

    # build app
    export REACT_APP_VERSION="$branch_name-$pack_time"

    rm -rf ./dist
    rm -rf ./pkgs
    mkdir -p dist
    mkdir -p pkgs

    cp -r build dist/
    cp -r ./conf dist/
    cp -r ./server/package.json dist/
    cp -r ./Procfile dist/
    cp -r ./server dist/

    cd dist
    tar -czf $file_name *
    cd ..
    mv dist/$file_name pkgs
    rm -rf ./dist

